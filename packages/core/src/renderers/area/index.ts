import { canvas as canvasRender } from "./canvas";
import { stackedCanvas as stackedCanvasRender } from "./stackedCanvas";
import { stacked as stackedRender } from "./stacked";

export const canvas = {
    render: canvasRender,
};

export const stacked = {
    render: stackedRender,
    canvas: {
        render: stackedCanvasRender,
    },
};

export * from "./render";
export * from "./focus";
