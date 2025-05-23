import type { IValue } from "./IValue";

import type {
    ScaleBand,
    ScaleDiverging,
    ScaleIdentity,
    ScaleLinear,
    ScaleLogarithmic,
    ScaleOrdinal,
    ScalePoint,
    ScalePower,
    ScaleQuantile,
    ScaleQuantize,
    ScaleRadial,
    ScaleSequentialBase,
    ScaleSequentialQuantile,
    ScaleSymLog,
    ScaleThreshold,
    ScaleTime,
} from "d3-scale";

export type ILinearScale =
    | ScaleLinear<number, number>
    | ScalePower<number, number>
    | ScaleLogarithmic<number, number>
    | ScaleSymLog<number, number>;

export type IScale =
    | ScaleLinear<number, number>
    | ScalePower<number, number>
    | ScaleLogarithmic<number, number>
    | ScaleSymLog<number, number>
    | ScaleIdentity
    | ScaleRadial<number, number>
    | ScaleTime<number, number>
    | ScaleSequentialQuantile<number>
    | ScaleSequentialBase<number>
    | ScaleDiverging<number>
    | ScaleQuantize<number>
    | ScaleQuantile<number>
    | ScaleThreshold<IValue, number>
    | ScaleOrdinal<IValue, number>
    | ScaleBand<IValue>
    | ScalePoint<IValue>;
