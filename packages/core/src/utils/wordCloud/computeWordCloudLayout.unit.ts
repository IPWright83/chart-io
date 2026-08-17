import { computeWordCloudLayout } from "./computeWordCloudLayout";

describe("/utils/wordCloud/computeWordCloudLayout", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    // A fixed-size measurer keeps every assertion below independent of font metrics, which vary by
    // environment (canvas polyfill, installed fonts, ...). Recreated per-test since resetAllMocks()
    // above clears a jest.fn's implementation along with its call history
    let measureText: (text: string, fontSize: number, fontFamily: string) => { width: number; height: number };
    beforeEach(() => {
        measureText = jest.fn((text: string) => ({
            width: text.length * 8,
            height: 14,
        }));
    });

    const data = [
        { word: "javascript", count: 50 },
        { word: "typescript", count: 30 },
        { word: "react", count: 10 },
    ];

    it("should place every word when there's enough room", () => {
        const words = computeWordCloudLayout(data, "word", "count", 800, 600, { measureText }, "unit_test");

        expect(words.map((w) => w.key)).toEqual(["javascript", "typescript", "react"]);
    });

    it("should scale font-size proportionally to value, largest and smallest hitting the bounds exactly", () => {
        const words = computeWordCloudLayout(
            data,
            "word",
            "count",
            800,
            600,
            { measureText, minFontSize: 10, maxFontSize: 50 },
            "unit_test",
        );

        const byKey = Object.fromEntries(words.map((w) => [w.key, w.fontSize]));
        expect(byKey.javascript).toBe(50);
        expect(byKey.react).toBe(10);
        expect(byKey.typescript).toBeGreaterThan(10);
        expect(byKey.typescript).toBeLessThan(50);
    });

    it("should give every word the same, mid-range font-size when all values are equal", () => {
        const equalData = [
            { word: "foo", count: 5 },
            { word: "bar", count: 5 },
        ];

        const words = computeWordCloudLayout(
            equalData,
            "word",
            "count",
            800,
            600,
            { measureText, minFontSize: 10, maxFontSize: 50 },
            "unit_test",
        );

        expect(words.map((w) => w.fontSize)).toEqual([30, 30]);
    });

    it("should place the largest word first, at the exact center of the available space", () => {
        const words = computeWordCloudLayout(data, "word", "count", 800, 600, { measureText }, "unit_test");

        const [first] = words;
        expect(first.key).toBe("javascript");
        expect(first.x).toBe(400);
        expect(first.y).toBe(300);
    });

    it("should keep every word's bounding box non-overlapping and within the plot area", () => {
        const words = computeWordCloudLayout(data, "word", "count", 800, 600, { measureText, padding: 4 }, "unit_test");

        const boxes = words.map((w) => {
            const halfWidth = w.width / 2 + 4;
            const halfHeight = w.height / 2 + 4;
            return { x0: w.x - halfWidth, y0: w.y - halfHeight, x1: w.x + halfWidth, y1: w.y + halfHeight };
        });

        for (const box of boxes) {
            expect(box.x0).toBeGreaterThanOrEqual(0);
            expect(box.y0).toBeGreaterThanOrEqual(0);
            expect(box.x1).toBeLessThanOrEqual(800);
            expect(box.y1).toBeLessThanOrEqual(600);
        }

        for (let i = 0; i < boxes.length; i++) {
            for (let j = i + 1; j < boxes.length; j++) {
                const a = boxes[i];
                const b = boxes[j];
                const overlaps = a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;
                expect(overlaps).toBe(false);
            }
        }
    });

    it("should keep ties in their original data order (a stable sort)", () => {
        const tiedData = [
            { word: "alpha", count: 10 },
            { word: "beta", count: 10 },
            { word: "gamma", count: 10 },
        ];

        const words = computeWordCloudLayout(tiedData, "word", "count", 800, 600, { measureText }, "unit_test");

        expect(words.map((w) => w.key)).toEqual(["alpha", "beta", "gamma"]);
    });

    it("should leave every word unrotated by default", () => {
        const words = computeWordCloudLayout(data, "word", "count", 800, 600, { measureText }, "unit_test");

        expect(words.every((w) => w.rotate === 0)).toBe(true);
    });

    it("should alternate rotation between placed words when rotate is true", () => {
        const words = computeWordCloudLayout(data, "word", "count", 800, 600, { measureText, rotate: true }, "unit_test");

        expect(words.map((w) => w.rotate)).toEqual([0, 90, 0]);
    });

    it("should pass each word's text and font-size through to a custom measureText", () => {
        computeWordCloudLayout(data, "word", "count", 800, 600, { measureText, minFontSize: 10, maxFontSize: 50 }, "unit_test");

        expect(measureText).toHaveBeenCalledWith("javascript", 50, "sans-serif");
        expect(measureText).toHaveBeenCalledWith("react", 10, "sans-serif");
    });

    it("should return an empty array for an empty dataset", () => {
        expect(computeWordCloudLayout([], "word", "count", 800, 600, { measureText }, "unit_test")).toEqual([]);
    });

    it("should treat negative values as 0 and log a W009 warning", () => {
        const spy = jest.spyOn(console, "warn").mockImplementation(jest.fn());

        const negativeData = [
            { word: "javascript", count: -5 },
            { word: "react", count: 10 },
        ];

        const words = computeWordCloudLayout(negativeData, "word", "count", 800, 600, { measureText }, "unit_test");

        const byKey = Object.fromEntries(words.map((w) => [w.key, w.value]));
        expect(byKey.javascript).toBe(0);
        expect(byKey.react).toBe(10);

        expect(spy.mock.calls[0][0]).toBe(
            "@chart-io encountered an warning. W009: Negative values in the count field aren't supported by <unit_test> and have been treated as 0.. You can read more about this https://ipwright83.github.io/chart-io/?path=/docs/errors-warnings-warnings-W009.",
        );
    });

    it("should omit words that can't fit without overlapping, and log a W010 warning", () => {
        const spy = jest.spyOn(console, "warn").mockImplementation(jest.fn());

        // Every word measures as almost the full available area (leaving just enough room for the
        // first, centered word's own padding), so only the first (largest) word can ever fit
        const hugeMeasureText = jest.fn(() => ({ width: 190, height: 190 }));

        const words = computeWordCloudLayout(
            data,
            "word",
            "count",
            200,
            200,
            { measureText: hugeMeasureText, padding: 0 },
            "unit_test",
        );

        expect(words.map((w) => w.key)).toEqual(["javascript"]);

        expect(spy.mock.calls[0][0]).toBe(
            "@chart-io encountered an warning. W010: 2 word(s) didn't fit within the available space and were omitted from the <unit_test>.. You can read more about this https://ipwright83.github.io/chart-io/?path=/docs/errors-warnings-warnings-W010.",
        );
    });

    it("should not warn when every word fits and there are no negative values", () => {
        const spy = jest.spyOn(console, "warn").mockImplementation(jest.fn());

        computeWordCloudLayout(data, "word", "count", 800, 600, { measureText }, "unit_test");

        expect(spy).not.toHaveBeenCalled();
    });
});
