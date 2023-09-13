import { ITheme } from "@chart-io/types";

import { downloadFile, exportPNG, logDebug } from "../../utils";
import { getTheme } from "./getTheme";

export function saveAsPNG(svgNode: HTMLElement, theme: "light" | "dark" | ITheme, width: number, height: number) {
    return async (filename: string) => {
        logDebug("Saving as a png");

        const imageData = await exportPNG(svgNode, getTheme(theme), width, height);
        downloadFile(imageData, filename);
        return imageData;
    };
}
