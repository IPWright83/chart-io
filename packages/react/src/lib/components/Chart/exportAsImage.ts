import { downloadFile, exportImage, logDebug } from "@chart-io/core";
import { ITheme } from "@chart-io/types";

import { getTheme } from "./getTheme";

/**
 * Exports the chart as an image
 * @param {HTMLElement} svgNode     The SVG node to save
 * @param {ITheme} theme            The current theme of the chart
 * @param {number} width            The width of the chart
 * @param {number} height           The height of the height
 * @return {Function}               A function that will trigger the export
 */
export function exportAsImage(svgNode: HTMLElement, theme: "light" | "dark" | ITheme, width: number, height: number) {
    /**
     * Function to trigger the actual export
     * @param  {string} filename        The filename to export to
     * @param {"PNG" | "JPG"} format    The format of the export
     * @param {number} scale            The scale of the image
     * @return {Promise<string>}        A promise that resolves with the PNG data in string format
     */
    return async (filename: string, format: "PNG" | "JPG" = "PNG", scale = 1) => {
        const fileExtension = format === "PNG" ? "png" : "jpg";
        logDebug(`Saving chart to ${filename}.${fileExtension}`);

        const imageData = await exportImage(svgNode, getTheme(theme), width, height, format, scale);
        downloadFile(imageData, `${filename}.${fileExtension}`);

        return imageData;
    };
}
