import { themes } from "@chart-io/core";

import React, { useRef } from "react";

import { sales_records_dataset } from "../../../data/sales_records_dataset";
import { XYChart, XAxis, YAxis, Scatters } from "../../components";

export default {
    title: "Exporting",
};

const ExportTemplate = (args) => {
    const chartRef = useRef(null);

    return (
        <div>
            <XYChart
                ref={chartRef}
                plotMargin={{
                    left: args.leftMargin,
                    right: args.rightMargin,
                    top: args.topMargin,
                    bottom: args.bottomMargin,
                }}
                data={sales_records_dataset}
                width={args.width}
                height={args.height}
                animationDuration={args.animationDuration}
                theme={args.theme}
                useCanvas={args.useCanvas}
                onClick={args.onClick}
                onMouseOver={args.onMouseOver}
                onMouseOut={args.onMouseOut}
            >
                <YAxis fields={[args.y, args.y2, args.y3]} />
                <XAxis fields={[args.x]} />
                <Scatters x={args.x} ys={[args.y, args.y2, args.y3]} radius={args.radius} />
            </XYChart>
            <button
                type="button"
                onClick={() => {
                    chartRef.current.exportImage(args.exportName, args.exportFormat, args.exportScale);
                }}
            >
                Save Image
            </button>
        </div>
    );
};

export const ExportSVGPNG = ExportTemplate.bind({});
ExportSVGPNG.storyName = "Exporting SVG charts to a PNG";
ExportSVGPNG.args = {
    useCanvas: false,
    exportName: "svgExport",
    exportFormat: "PNG",
    exportScale: 1,
    width: 800,
    height: 500,
    animationDuration: 0,
    leftMargin: 70,
    rightMargin: 40,
    topMargin: 40,
    bottomMargin: 40,
    data: sales_records_dataset,
    y: "Total Profit",
    x: "Units Sold",
    y2: "Total Revenue",
    y3: "Total Cost",
};

export const ExportSVGJPG = ExportTemplate.bind({});
ExportSVGJPG.storyName = "Exporting SVG charts to a JPG";
ExportSVGJPG.args = {
    ...ExportSVGPNG.args,
    exportFormat: "JPG",
};

export const ExportSVGScale = ExportTemplate.bind({});
ExportSVGScale.storyName = "Exporting SVG charts with a larger scale";
ExportSVGScale.args = {
    ...ExportSVGPNG.args,
    exportScale: 5,
};

export const ExportCanvas = ExportTemplate.bind({});
ExportCanvas.storyName = "Exporting Canvas charts to a PNG";
ExportCanvas.args = {
    ...ExportSVGPNG.args,
    exportName: "canvasExport",
    exportFormat: "PNG",
    useCanvas: true,
};
