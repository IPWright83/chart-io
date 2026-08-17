import { themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { word_frequency_dataset } from "../../../data/word_frequency_dataset";
import { argTypes } from "../../../storybook/argTypes";
import { jitterFields, withDataControls } from "../../../storybook/dataControls";
import { createCanvasTest, createSVGTest } from "../../testUtils";
import { WordCloud } from "./WordCloud";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "Charts/Miscellaneous/WordCloud",
    component: WordCloud,
    parameters: {
        docs: {
            transformSource: (src) => {
                src = src.replace(/data={\[.*?\]}/gs, "data={[ ...dataset ]}");
                src = src.replaceAll(/undefined,?/g, "");
                src = src.replace(/^\s*\n/gm, "");
                return src;
            },
        },
        chromatic: { delay: 300 },
    },
    args: {
        onClick: fn(),
        onMouseOver: fn(),
        onMouseOut: fn(),
    },
    argTypes: {
        useCanvas,
        width,
        height,
        theme,
        leftMargin: margin,
        rightMargin: margin,
        topMargin: margin,
        bottomMargin: margin,
    },
} as Meta<typeof WordCloud>;

const data = word_frequency_dataset;

const wordCloudDataControls = {
    initialData: data,
    randomize: (row: (typeof data)[number]) => jitterFields(row, ["count"], 0.3),
    // Clones a random existing row under a synthetic word, since every word in the source dataset
    // is already represented
    createPoint: (current: typeof data) => {
        const base = current[Math.floor(Math.random() * current.length)];
        return jitterFields({ ...base, word: `${base.word}-${current.length}` }, ["count"], 0.3);
    },
    minLength: 6,
};

const WordCloudTemplate = (args) => (
    <WordCloud
        data={args.data ?? data}
        plotMargin={{
            left: args.leftMargin,
            right: args.rightMargin,
            top: args.topMargin,
            bottom: args.bottomMargin,
        }}
        width={args.width}
        height={args.height}
        animationDuration={args.animationDuration}
        theme={args.theme}
        useCanvas={args.useCanvas}
        onClick={args.onClick}
        onMouseOver={args.onMouseOver}
        onMouseOut={args.onMouseOut}
        category={args.category}
        value={args.value}
        minFontSize={args.minFontSize}
        maxFontSize={args.maxFontSize}
        padding={args.padding}
        rotate={args.rotate}
    />
);

const WordCloudTemplateWithControls = withDataControls(WordCloudTemplate, wordCloudDataControls);

export const Basic = {
    name: "Basic Plot",
    render: WordCloudTemplateWithControls,
    args: {
        useCanvas: false,
        width: 800,
        height: 500,
        animationDuration: 250,
        theme: themes.light,
        leftMargin: 20,
        rightMargin: 20,
        topMargin: 20,
        bottomMargin: 20,
        category: "word",
        value: "count",
        minFontSize: 12,
        maxFontSize: 64,
        padding: 3,
        rotate: false,
    },
    play: createSVGTest("text.word-cloud-word", { clientX: 400, clientY: 250 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: WordCloudTemplateWithControls,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    play: createCanvasTest({ clientX: 400, clientY: 250 }),
};

export const Rotated = {
    name: "Rotated Words",
    render: WordCloudTemplate,
    args: {
        ...Basic.args,
        rotate: true,
    },
    play: createSVGTest("text.word-cloud-word", { clientX: 400, clientY: 250 }),
};

// A handful of words, to check the layout still looks deliberate (not sparse/awkward) well below
// the ~25-word dataset it's more typically shown with
const fewWordsData = data.slice(0, 5);

export const FewWords = {
    name: "Few Words",
    render: WordCloudTemplate,
    args: {
        ...Basic.args,
        data: fewWordsData,
    },
    play: createSVGTest("text.word-cloud-word", { clientX: 400, clientY: 250 }),
};

// Stress-tests the spiral placement with far more words than the default font-size range
// comfortably fits - some are expected to be dropped (and a W010 warning logged), which is the
// documented, graceful behaviour for an over-full cloud rather than a bug
const manyWordsData = Array.from({ length: 60 }, (_, i) => {
    const base = data[i % data.length];
    const pass = Math.floor(i / data.length);
    return {
        word: pass === 0 ? base.word : `${base.word}-${pass + 1}`,
        count: Math.max(4, base.count - i),
    };
});

export const ManyWords = {
    name: "Many Words",
    render: WordCloudTemplate,
    args: {
        ...Basic.args,
        data: manyWordsData,
        minFontSize: 8,
        maxFontSize: 56,
    },
    play: createSVGTest("text.word-cloud-word", { clientX: 400, clientY: 250 }),
};
