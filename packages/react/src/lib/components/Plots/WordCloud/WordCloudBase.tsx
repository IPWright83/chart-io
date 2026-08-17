import { chartSelectors, computeWordCloudLayout, d3, ensureValuesAreUnique, IState } from "@chart-io/core";
import type { IColor, IMeasureText, IOnClick, IOnMouseOut, IOnMouseOver, IPositionedWord } from "@chart-io/core";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { useLegendItems, useRender } from "../../../hooks";

import { renderCanvas } from "../renderCanvas";
import { useFocused } from "../useFocused";
import { useTooltip } from "../useTooltip";

export interface IWordCloudBaseProps {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     */
    layer?: React.MutableRefObject<Element>;
    /**
     * The key of the field used for the text of each word
     */
    category: string;
    /**
     * The key of the field used for the size of each word
     */
    value: string;
    /**
     * The font-size, in pixels, given to the word with the smallest value
     * @default 12
     */
    minFontSize?: number;
    /**
     * The font-size, in pixels, given to the word with the largest value
     * @default 60
     */
    maxFontSize?: number;
    /**
     * The gap, in pixels, kept clear around every word, so neighbouring words never visually touch
     * @default 2
     */
    padding?: number;
    /**
     * The font family words are rendered in. Defaults to the theme's font family
     */
    fontFamily?: string;
    /**
     * Should alternating words be rotated 90 degrees, for a more traditional word cloud look?
     * @default false
     */
    rotate?: boolean;
    /**
     * The set of colors to cycle through for each word. Defaults to the theme's series colors
     */
    colors?: Array<IColor>;
    /**
     * Measures the pixel dimensions a word would take up at a given font-size. Override this if
     * `<canvas>` isn't available in your environment, or to account for custom letter-spacing/font-
     * loading behaviour - see `computeWordCloudLayout` from `@chart-io/core`
     * @default A `<canvas>`-based measurer
     */
    measureText?: IMeasureText;
    /**
     * Should the plot be interactive and be able to trigger tooltips?
     * @default true
     */
    interactive?: boolean;
    /**
     * Should this series feature in the Legend?
     * @default false
     */
    showInLegend?: boolean;
    /**
     * An HTML Canvas if the plot should be rendering to canvas instead
     */
    canvas?: HTMLCanvasElement;
    /**
     * This is an internally used function to allow the plot to render to a virtual canvas
     */
    renderVirtualCanvas?: (update: d3.Transition<Element, unknown, any, unknown>) => void;
    onMouseOver?: IOnMouseOver;
    onMouseOut?: IOnMouseOut;
    onClick?: IOnClick;
}

/**
 * Represents a WordCloud plot, sizing each word in the dataset's `category` field proportionally to
 * `value` and packing them - largest first, working outward from the center - into the available
 * space without overlapping
 * @param  props       The set of React properties
 * @return             The WordCloud plot component
 */
export function WordCloudBase({
    category,
    value,
    canvas,
    renderVirtualCanvas,
    layer,
    minFontSize = 12,
    maxFontSize = 60,
    padding = 2,
    fontFamily,
    rotate = false,
    colors,
    measureText,
    showInLegend = false,
    interactive = true,
    onMouseOver,
    onMouseOut,
    onClick,
}: IWordCloudBaseProps) {
    const data = useSelector((s: IState) => chartSelectors.data(s));
    const width = useSelector((s: IState) => chartSelectors.dimensions.width(s));
    const height = useSelector((s: IState) => chartSelectors.dimensions.height(s));
    const plotLeft = useSelector((s: IState) => chartSelectors.dimensions.plot.left(s));
    const plotTop = useSelector((s: IState) => chartSelectors.dimensions.plot.top(s));
    const plotWidth = useSelector((s: IState) => chartSelectors.dimensions.plot.width(s));
    const plotHeight = useSelector((s: IState) => chartSelectors.dimensions.plot.height(s));
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const animationDuration = useSelector((s: IState) => chartSelectors.animationDuration(s));

    const family = fontFamily ?? theme.font.family;
    const palette = colors ?? theme.series.colors;
    const categories = useMemo(() => data.map((d) => `${d[category]}`), [data, category]);
    const legendColors = useMemo(
        () => categories.map((_, index) => palette[index % palette.length]),
        [categories, palette],
    );

    useLegendItems(categories, "square", showInLegend, legendColors);
    const onTooltip = useTooltip();
    const onFocus = useFocused(theme);

    useRender(() => {
        // Unable to render without the layer avaliable
        if (!layer.current) return;

        ensureValuesAreUnique(data, category, "WordCloud");

        // @ts-ignore: TODO: Not sure how to fix this
        const colorScale = d3.scaleOrdinal<string>().domain(categories).range(palette);

        const words = computeWordCloudLayout(
            data,
            category,
            value,
            plotWidth,
            plotHeight,
            { minFontSize, maxFontSize, padding, fontFamily: family, rotate, measureText },
            "WordCloud",
        );

        // D3 data join
        const join = d3
            .select(layer.current)
            .selectAll<SVGTextElement, IPositionedWord>(".word-cloud-word")
            .data(words, (word) => word.key);

        // Exit words
        join.exit().remove();

        // Enter words, centered at their final position with zero opacity so they fade into place
        const enter = join
            .enter()
            .append("text")
            .attr("class", "word-cloud-word")
            .attr("x", (word) => plotLeft + word.x)
            .attr("y", (word) => plotTop + word.y)
            .attr("dy", (word) => word.fontSize * 0.35)
            .attr("text-anchor", "middle")
            .style("font-family", family)
            .style("fill", (word) => colorScale(word.key))
            .style("cursor", interactive ? "pointer" : "default")
            .style("opacity", 0);

        const update = enter.merge(join as any);

        // .text()/rotation are applied outside the transition. .text() isn't interpolatable and
        // calling it on a transition throws; rotation uses d3's special-cased "transform"
        // interpolator which relies on SVGAnimatedTransformList - unsupported in jsdom - so it's
        // snapped straight to its final value rather than animated
        update.text((word) => word.key);
        update
            .attr("data-rotate", (word) => word.rotate)
            // The word's own (unrotated) measured size, in text-local units - lets the Canvas
            // hit-testing pass paint a full rectangle instead of the glyph outlines themselves, so
            // hovering a gap between/inside letters doesn't drop out of the word's hit region
            .attr("data-width", (word) => word.width)
            .attr("data-height", (word) => word.height)
            .attr("transform", (word) => (word.rotate ? `rotate(${word.rotate}, ${plotLeft + word.x}, ${plotTop + word.y})` : null));

        update
            .on("mouseover", function (event, word) {
                // istanbul ignore next
                if (!interactive) return;

                const datum = word.datum;
                const color = colorScale(word.key) as IColor;

                onMouseOver && onMouseOver(datum, this, event);
                onFocus && onFocus({ element: this, event, datum });
                onTooltip && onTooltip({ datum, event, name: word.key, value: datum[value], color });
            })
            .on("mouseout", function (event, word) {
                // istanbul ignore next
                if (!interactive) return;

                onMouseOut && onMouseOut(word.datum, this, event);
                onFocus && onFocus(null);
                onTooltip && onTooltip(null);
            })
            .on("click", function (event, word) {
                // istanbul ignore next
                if (!interactive) return;

                onClick && onClick(word.datum, this, event);
            });

        const transition = update
            .transition("word-cloud-word")
            .duration(animationDuration)
            .attr("x", (word) => plotLeft + word.x)
            .attr("y", (word) => plotTop + word.y)
            .attr("dy", (word) => word.fontSize * 0.35)
            .style("font-size", (word) => `${word.fontSize}px`)
            .style("fill", (word) => colorScale(word.key))
            .style("opacity", theme.series.opacity);

        renderCanvas(canvas, renderVirtualCanvas, width, height, transition);
    }, [
        category,
        value,
        data,
        canvas,
        renderVirtualCanvas,
        plotLeft,
        plotTop,
        plotWidth,
        plotHeight,
        minFontSize,
        maxFontSize,
        padding,
        family,
        rotate,
        measureText,
        layer,
        animationDuration,
        onMouseOver,
        onMouseOut,
        onClick,
        palette,
        categories,
        interactive,
        theme,
    ]);

    return null;
}
