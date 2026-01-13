import { commonDefaultArgTypes } from "../commonDefaultArgTypes";
import { seriesArgTypes } from "../seriesArgTypes";

const defaultArgTypes = {
    ...commonDefaultArgTypes,
    y: seriesArgTypes,
    x: seriesArgTypes,
    x2: seriesArgTypes,
};

export { defaultArgTypes };
