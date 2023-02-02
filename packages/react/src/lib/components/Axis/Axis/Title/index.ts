import { Title, ITitleProps } from "./Title";

import { getTransform } from "./getTransform";

// @ts-ignore: extending the interface on purpose
Title.getTransform = getTransform;

export { Title };
export type { ITitleProps };
