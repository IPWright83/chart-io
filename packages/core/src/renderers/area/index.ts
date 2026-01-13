import { IStackedAreaFocusProps, stackedFocus } from "./stackedFocus";
import { IStackedAreaTooltipProps, stackedTooltip } from "./stackedTooltip";
import { canvas as canvasRender } from "./canvas";
import { stackedCanvas } from "./stackedCanvas";
import { stacked as stackedRender } from "./stacked";

export const canvas = {
    render: canvasRender,
};

export const stacked = {
    render: stackedRender,
    canvas: {
        render: stackedCanvas,
    },
    focus: stackedFocus,
    tooltip: stackedTooltip,
};

export * from "./render";
export * from "./focus";
export * from "./tooltip";
export type { IStackedAreaFocusProps };
export type { IStackedAreaTooltipProps };
