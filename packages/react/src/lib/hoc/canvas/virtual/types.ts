import type { IDatum } from "@chart-io/core";

export type IColorToData = { datum: IDatum; node: Element };
export type IColorToDataMap = Record<string, IColorToData>;
