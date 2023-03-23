import { ITitleProps, Title } from "./Title";

import { getTransform } from "./getTransform";

// @ts-expect-error: extending the interface on purpose
Title.getTransform = getTransform;

export { Title };
export type { ITitleProps };
