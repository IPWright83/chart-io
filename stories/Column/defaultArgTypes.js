import { commonDefaultArgTypes } from "../commonDefaultArgTypes";
import { seriesArgTypes } from "../seriesArgTypes";

const defaultArgTypes = {
    ...commonDefaultArgTypes,
    x: seriesArgTypes,
    y: seriesArgTypes,
    y2: seriesArgTypes,
};

export { defaultArgTypes };
