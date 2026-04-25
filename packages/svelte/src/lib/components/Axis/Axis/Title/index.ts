import Title from "./Title.svelte";

import { getTransform } from "./getTransform.js";

// @ts-expect-error: extending the interface on purpose
Title.getTransform = getTransform;

export { Title };
