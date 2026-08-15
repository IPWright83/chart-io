import { createLabeller, themes } from "@chart-io/core";

import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import React from "react";

import { argTypes } from "../../../../storybook/argTypes";
import { jitterFields, withDataControls } from "../../../../storybook/dataControls";
import { createCanvasTest, createSVGTest } from "../../../testUtils";
import { AngleAxis, RadialAxis } from "../../Axis";
import { RadialChart } from "../../RadialChart";
import { Radar } from "./Radar";

const { width, height, margin, useCanvas, theme } = argTypes;

export default {
    title: "Charts/RadialCharts/Radar",
    component: Radar,
    parameters: {
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
} as Meta<typeof Radar>;

// One row per series - each field in `ys` becomes a spoke, read directly off that series' row
const skills = ["Speed", "Power", "Defense", "Stamina", "Agility"];

const twoPlayers = [
    { player: "Player A", Speed: 80, Power: 65, Defense: 70, Stamina: 85, Agility: 60 },
    { player: "Player B", Speed: 60, Power: 90, Defense: 75, Stamina: 55, Agility: 80 },
];

const threePlayers = [
    ...twoPlayers,
    { player: "Player C", Speed: 75, Power: 70, Defense: 85, Stamina: 65, Agility: 90 },
];

const manyPlayers = [
    ...threePlayers,
    { player: "Player D", Speed: 55, Power: 60, Defense: 50, Stamina: 90, Agility: 45 },
    { player: "Player E", Speed: 90, Power: 45, Defense: 60, Stamina: 50, Agility: 85 },
];

function nextPlayer(current: typeof twoPlayers) {
    const letter = String.fromCharCode(65 + current.length);
    const values = Object.fromEntries(skills.map((skill) => [skill, Math.round(40 + Math.random() * 55)]));
    return { player: `Player ${letter}`, ...values } as (typeof twoPlayers)[number];
}

function jitterSkills(row: (typeof twoPlayers)[number]) {
    const jittered = jitterFields(row, skills, 0.2);
    // Keep every skill within the radar's 0-100 domain after jittering
    for (const skill of skills) {
        jittered[skill] = Math.min(100, Math.max(0, Math.round(jittered[skill])));
    }
    return jittered;
}

const radarDataControls = {
    initialData: twoPlayers,
    randomize: jitterSkills,
    createPoint: nextPlayer,
    minLength: 1,
};

const RadarTemplate = (args) => (
    <RadialChart
        data={args.data}
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
    >
        <AngleAxis fields="category" domain={args.ys} />
        <RadialAxis fields={args.ys} />
        {/* category defaults to "category", matching the AngleAxis fields above - only needs to be
        set explicitly when a chart has more than one independent Radar */}
        <Radar name="player" ys={args.ys} filled={args.filled} />
    </RadialChart>
);

const RadarTemplateWithControls = withDataControls(RadarTemplate, radarDataControls);

export const Basic = {
    name: "Basic Plot",
    render: RadarTemplateWithControls,
    args: {
        useCanvas: false,
        width: 800,
        height: 500,
        animationDuration: 250,
        theme: themes.light,
        leftMargin: 60,
        rightMargin: 60,
        topMargin: 60,
        bottomMargin: 60,
        data: twoPlayers,
        ys: skills,
        filled: true,
    },
    // Targets the "Speed" vertex marker for Player A, near the top of the chart
    play: createSVGTest("circle.radar-marker", { clientX: 416, clientY: 76 }),
};

export const Canvas = {
    name: "Using Canvas",
    render: RadarTemplateWithControls,
    args: {
        ...Basic.args,
        useCanvas: true,
    },
    // Targets the "Speed" vertex marker for Player A, near the top of the chart
    play: createCanvasTest({ clientX: 416, clientY: 76 }),
};

export const SingleSeries = {
    name: "Single Series",
    render: RadarTemplate,
    args: {
        ...Basic.args,
        data: [twoPlayers[0]],
    },
    // Targets the "Speed" vertex marker for Player A, near the top of the chart
    play: createSVGTest("circle.radar-marker", { clientX: 416, clientY: 76 }),
};

export const ThreeSeries = {
    name: "Three Series",
    render: RadarTemplate,
    args: {
        ...Basic.args,
        data: threePlayers,
    },
    // Targets the "Speed" vertex marker for Player A, near the top of the chart
    play: createSVGTest("circle.radar-marker", { clientX: 416, clientY: 76 }),
};

export const Unfilled = {
    name: "Unfilled (Overlapping Trends)",
    render: RadarTemplate,
    args: {
        ...Basic.args,
        data: manyPlayers,
        filled: false,
    },
    // Targets the "Speed" vertex marker for Player A, near the top of the chart. Its radius (and so
    // its screen position) differs slightly from the other stories, since the shared domain now
    // spans 5 players instead of 2-3
    play: createSVGTest("circle.radar-marker", { clientX: 416, clientY: 97 }),
};

// GPUs are the series (one row each); each spec is its own spoke with its own natural domain -
// e.g. memory in GB vs a 1-10 score - normalized onto the same rings so they're comparable
const gpuFields = ["memory_gb", "cuda_cores", "tensor_tflops", "ai_score"];

const gpuData = [
    { gpu: "RTX 4060 Ti 16GB", memory_gb: 16, cuda_cores: 4352, tensor_tflops: 22, ai_score: 8 },
    { gpu: "RTX 4060 Ti 8GB", memory_gb: 8, cuda_cores: 4352, tensor_tflops: 22, ai_score: 7 },
    { gpu: "RTX 3060 Ti", memory_gb: 8, cuda_cores: 4864, tensor_tflops: 16, ai_score: 5 },
];

const gpuLabeller = createLabeller({
    memory_gb: "Memory (GB)",
    cuda_cores: "CUDA Cores",
    tensor_tflops: "Tensor Perf (TFLOPS)",
    ai_score: "AI Score (1-10)",
});

const DifferentDomainsTemplate = (args) => (
    <RadialChart
        data={gpuData}
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
        // Setting the labeller at the chart level (rather than on <Radar> itself) makes it
        // available to every plot/axis in this chart, not just this one Radar
        labeller={gpuLabeller}
    >
        <AngleAxis fields="category" domain={gpuFields} tickFormat={gpuLabeller} />
        <RadialAxis fields={gpuFields} />
        <Radar name="gpu" ys={gpuFields} />
    </RadialChart>
);

export const DifferentDomains = {
    name: "Different Domains per Spoke",
    render: DifferentDomainsTemplate,
    args: {
        ...Basic.args,
    },
    // Targets the "Memory (GB)" vertex marker for the first GPU, near the top of the chart
    play: createSVGTest("circle.radar-marker", { clientX: 416, clientY: 76 }),
};
