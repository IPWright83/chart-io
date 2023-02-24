import type { IDatum } from "@d3-chart/types";

export type IColorToData = { datum: IDatum; node: Element };
export type IColorToDataMap = Record<string, IColorToData>;
