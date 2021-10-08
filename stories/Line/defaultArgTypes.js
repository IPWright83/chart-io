import { commonDefaultArgTypes } from "../commonDefaultArgTypes";
import { seriesArgTypes } from "../seriesArgTypes";

const defaultArgTypes = {
    ...commonDefaultArgTypes,
    x: seriesArgTypes,
    y: seriesArgTypes,
};

export { defaultArgTypes };
