import type { IValue } from "./IValue";

import type {
    ScaleLinear,
    ScalePower,
    ScaleLogarithmic,
    ScaleSymLog,
    ScaleIdentity,
    ScaleRadial,
    ScaleTime,
    ScaleSequentialBase,
    ScaleSequentialQuantile,
    ScaleDiverging,
    ScaleQuantize,
    ScaleQuantile,
    ScaleThreshold,
    ScaleOrdinal,
    ScaleBand,
    ScalePoint,
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
    | ScaleRadial<IValue, number>
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
