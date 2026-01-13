import type { IDatum } from "@chart-it/types";

export type IColorToData = { datum: IDatum; node: Element };
export type IColorToDataMap = Record<string, IColorToData>;
