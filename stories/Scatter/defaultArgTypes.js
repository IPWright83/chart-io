import { commonDefaultArgTypes } from "../commonDefaultArgTypes";
import { seriesArgTypes } from "../seriesArgTypes";

const defaultArgTypes = {
    ...commonDefaultArgTypes,
    x: seriesArgTypes,
    y: seriesArgTypes,
    radius: {
        description: "The radius of each point",
        control: { type: "range", min: 1, max: 25 },
        defaultValue: { summary: 5 },
    },
};

export { defaultArgTypes };
