import React from "react";

import { uniqBy } from "lodash";

import { sales_records_dataset } from "../../../data/sales_records_dataset";
import { XYChart, XAxis, YAxis, Columns } from "../../components";
import { themes } from "../../themes";

export default {
    title: "Theming",
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
};

const data = uniqBy(sales_records_dataset, (d) => d["Item Type"]);

const ThemeTemplate = (args) => {
    const x = "Item Type";
    const y = "Unit Price";
    const y2 = "Unit Cost";

    return (
        <XYChart
            data={data}
            margin={{ left: 30, right: 10, top: 10, bottom: 30 }}
            width={800}
            height={500}
            theme={args.theme}
        >
            <YAxis fields={[y, y2]} />
            <XAxis fields={[x]} scaleType="band" showGridlines={false} />
            <Columns x={x} ys={[y, y2]} grouped={true} />
        </XYChart>
    );
};

export const LightTheme = ThemeTemplate.bind({});
LightTheme.storyName = "Light (Default)";
LightTheme.args = {
    theme: themes.light,
};

export const DarkTheme = ThemeTemplate.bind({});
DarkTheme.storyName = "Dark";
DarkTheme.args = {
    theme: themes.dark,
};

export const Theme1 = ThemeTemplate.bind({});
Theme1.storyName = "Theme 1";
Theme1.args = {
    theme: {
        ...themes.dark,
        background: "#F3F1E5",
        axis: {
            stroke: "#969495",
        },
        gridlines: {
            stroke: "#969495",
        },
        series: {
            colors: ["#2FC2AF", "#433F3E"],
        },
    },
};

export const Theme2 = ThemeTemplate.bind({});
Theme2.storyName = "Theme 2";
Theme2.args = {
    theme: {
        ...themes.dark,
        background: "#000000",
        axis: {
            stroke: "#FFFFFF",
            strokeOpacity: 1,
            strokeWidth: 2,
        },
        droplines: {
            strokeWidth: 5,
            strokeDasharray: 8,
        },
        gridlines: {
            stroke: "#FFFFFF",
            strokeOpacity: 0.2,
            strokeWidth: 3,
        },
        series: {
            opacity: 0.7,
            selectedOpacity: 1,
            colors: ["#682B8F", "#FF8B35"],
        },
    },
};
