import { d3 } from "../../d3";
import type { IData, IDatum } from "../../types";
import { logWarning } from "../logger";

// A word's font-size is derived proportionally from its own line-height, rather than a metric
// read off the (possibly missing) canvas context, so layout stays consistent between the default
// canvas-based measurer and any custom `measureText` override
const LINE_HEIGHT_RATIO = 1.1;

// How far apart (in radians) each step along the Archimedean spiral is - smaller is a tighter,
// slower search; this is deliberately small so words settle close to their ideal radius
const SPIRAL_STEP_ANGLE = 0.1;

// How quickly the spiral's radius grows per radian - keeps early steps close to the center, where
// the biggest (first-placed) words belong
const SPIRAL_GROWTH = 3;

export interface IPositionedWord {
    /**
     * The word itself, read from the `category` field
     */
    key: string;
    /**
     * The (non-negative) value this word was sized from
     */
    value: number;
    /**
     * The original row this word was built from
     */
    datum: IDatum;
    /**
     * The x-coordinate of the center of the word, relative to the plot area
     */
    x: number;
    /**
     * The y-coordinate of the center of the word, relative to the plot area
     */
    y: number;
    /**
     * The font-size, in pixels, this word was placed at
     */
    fontSize: number;
    /**
     * The rotation, in degrees, applied around the word's own center
     */
    rotate: number;
    /**
     * The measured width, in pixels, of the word's text at its own `fontSize` (unrotated)
     */
    width: number;
    /**
     * The measured height, in pixels, of the word's text at its own `fontSize` (unrotated)
     */
    height: number;
}

export interface IMeasuredText {
    width: number;
    height: number;
}

export type IMeasureText = (
    text: string,
    fontSize: number,
    fontFamily: string,
) => IMeasuredText;

export interface IWordCloudLayoutOptions {
    /**
     * The font-size, in pixels, given to the smallest value
     * @default 12
     */
    minFontSize?: number;
    /**
     * The font-size, in pixels, given to the largest value
     * @default 60
     */
    maxFontSize?: number;
    /**
     * The gap, in pixels, kept clear around every word's bounding box, so neighbouring words never
     * visually touch
     * @default 2
     */
    padding?: number;
    /**
     * The font family words are measured and rendered in
     * @default "sans-serif"
     */
    fontFamily?: string;
    /**
     * Should alternating words be rotated 90 degrees, for a more traditional word cloud look?
     * @default false
     */
    rotate?: boolean;
    /**
     * Measures the pixel dimensions a word would take up at a given font-size. Defaults to a
     * `<canvas>`-based measurer - override this if `<canvas>` isn't available in your environment,
     * or to account for custom letter-spacing/font-loading behaviour
     */
    measureText?: IMeasureText;
}

/**
 * The default `measureText` - uses a detached `<canvas>` 2D context, the standard way to measure
 * rendered text width in a browser. Falls back to a rough character-count estimate when no
 * `document` is available (e.g. a non-browser rendering environment), so layout still degrades
 * gracefully rather than throwing
 * @param  text          The word to measure
 * @param  fontSize      The font-size, in pixels, to measure it at
 * @param  fontFamily    The font family to measure it in
 * @return                The measured width/height, in pixels
 */
const defaultMeasureText: IMeasureText = (text, fontSize, fontFamily) => {
    // istanbul ignore else: every test environment this runs in provides a `document`
    if (typeof document !== "undefined") {
        const context = document.createElement("canvas").getContext("2d");
        context.font = `${fontSize}px ${fontFamily}`;

        return { width: context.measureText(text).width, height: fontSize * LINE_HEIGHT_RATIO };
    }

    // istanbul ignore next
    return { width: text.length * fontSize * 0.6, height: fontSize * LINE_HEIGHT_RATIO };
};

interface IBoundingBox {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
}

function overlaps(a: IBoundingBox, b: IBoundingBox): boolean {
    return a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;
}

// Walks an Archimedean spiral out from the center of the plot, returning the first point whose
// `boxWidth`/`boxHeight` bounding box both stays fully within `[0, width] x [0, height]` and
// doesn't overlap any `placed` word - or null if the spiral runs out of room to search
function findPosition(
    width: number,
    height: number,
    boxWidth: number,
    boxHeight: number,
    placed: IBoundingBox[],
): { x: number; y: number } | null {
    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.sqrt(cx * cx + cy * cy);

    for (let angle = 0, radius = 0; radius < maxRadius; angle += SPIRAL_STEP_ANGLE, radius = SPIRAL_GROWTH * angle) {
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        const box = { x0: x - boxWidth / 2, y0: y - boxHeight / 2, x1: x + boxWidth / 2, y1: y + boxHeight / 2 };

        const withinBounds = box.x0 >= 0 && box.y0 >= 0 && box.x1 <= width && box.y1 <= height;
        if (withinBounds && !placed.some((other) => overlaps(box, other))) {
            return { x, y };
        }
    }

    return null;
}

/**
 * Lays out a flat, un-nested dataset as a word cloud: each row becomes one word, sized by `value`
 * and placed - largest first, working outward from the center along an Archimedean spiral - so no
 * two words' bounding boxes overlap. Used internally by `<WordCloud>` - use this directly if you
 * need to compose the layout into a chart of your own
 *
 * Placement order is always largest-value-first - unlike `<Treemap>`/`<CirclePacking>`'s `sort`,
 * this isn't a cosmetic choice: an Archimedean spiral only produces a sensible (tightly packed,
 * most prominent words nearest the center) cloud when the biggest words claim the center first
 *
 * Negative values aren't representable by a font-size, so - like the hierarchical layouts - they're
 * treated as `0` and a `W009` warning is logged. Words whose bounding box can't be placed anywhere
 * within `width`/`height` without overlapping another word are dropped from the result and a `W010`
 * warning is logged
 * @param  data              The full dataset
 * @param  category          The key of the field used for each word's text
 * @param  value             The key of the field used for each word's size
 * @param  width             The available width, in pixels, to lay words out within
 * @param  height            The available height, in pixels, to lay words out within
 * @param  options           Font-size/padding/rotation/measurement configuration - see `IWordCloudLayoutOptions`
 * @param  componentName     The name of the component building this layout, used in the `W009`/`W010` warnings
 * @return                   The positioned words, in the order they were successfully placed
 */
export function computeWordCloudLayout(
    data: IData,
    category: string,
    value: string,
    width: number,
    height: number,
    options: IWordCloudLayoutOptions,
    componentName: string,
): IPositionedWord[] {
    const {
        minFontSize = 12,
        maxFontSize = 60,
        padding = 2,
        fontFamily = "sans-serif",
        rotate = false,
        measureText = defaultMeasureText,
    } = options;

    if (data.length === 0 || width <= 0 || height <= 0) {
        return [];
    }

    if (data.some((row) => Number(row[value]) < 0)) {
        // prettier-ignore
        logWarning("W009", `Negative values in the ${value} field aren't supported by <${componentName}> and have been treated as 0.`);
    }

    const values = data.map((row) => Math.max(0, Number(row[value]) || 0));
    const minValue = d3.min(values);
    const maxValue = d3.max(values);

    // A degenerate (all-equal) domain can't be scaled - every word is equally prominent, so they
    // all get the same, mid-range font-size instead
    const fontSizeScale: (value: number) => number =
        minValue === maxValue
            ? () => (minFontSize + maxFontSize) / 2
            : d3.scaleSqrt().domain([minValue, maxValue]).range([minFontSize, maxFontSize]);

    const words = data
        .map((datum, index) => ({
            key: `${datum[category]}`,
            value: Math.max(0, Number(datum[value]) || 0),
            datum,
            index,
        }))
        // Ties keep their original data order - .sort() is stable, so only value drives reordering
        .sort((a, b) => d3.descending(a.value, b.value));

    const placed: (IPositionedWord & IBoundingBox)[] = [];
    let omitted = 0;

    words.forEach((word, placementIndex) => {
        const fontSize = fontSizeScale(word.value);
        const wordRotate = rotate && placementIndex % 2 === 1 ? 90 : 0;
        const measured = measureText(word.key, fontSize, fontFamily);
        const boxWidth = (wordRotate === 90 ? measured.height : measured.width) + padding * 2;
        const boxHeight = (wordRotate === 90 ? measured.width : measured.height) + padding * 2;

        const position = findPosition(width, height, boxWidth, boxHeight, placed);

        if (!position) {
            omitted++;
            return;
        }

        placed.push({
            key: word.key,
            value: word.value,
            datum: word.datum,
            x: position.x,
            y: position.y,
            fontSize,
            rotate: wordRotate,
            width: measured.width,
            height: measured.height,
            x0: position.x - boxWidth / 2,
            y0: position.y - boxHeight / 2,
            x1: position.x + boxWidth / 2,
            y1: position.y + boxHeight / 2,
        });
    });

    if (omitted > 0) {
        // prettier-ignore
        logWarning("W010", `${omitted} word(s) didn't fit within the available space and were omitted from the <${componentName}>.`);
    }

    return placed.map((word) => ({
        key: word.key,
        value: word.value,
        datum: word.datum,
        x: word.x,
        y: word.y,
        fontSize: word.fontSize,
        rotate: word.rotate,
        width: word.width,
        height: word.height,
    }));
}
