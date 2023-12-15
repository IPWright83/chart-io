import { canvas as canvasRender } from "./canvas";
import { stacked as stackedRender } from "./stacked";
import { stackedCanvas as stackedCanvasRender } from "./stackedCanvas";

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
