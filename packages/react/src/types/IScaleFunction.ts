import type { IPrimitive } from "./IPrimitive";

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

export type IScaleFunction<Domain> = 
    | ScaleLinear<number, number>
    | ScalePower<number, number>
    | ScaleLogarithmic<number, number>
    | ScaleSymLog<number, number>
    | ScaleIdentity
    | ScaleRadial<Domain, number>
    | ScaleTime<Date, number>
    | ScaleSequentialQuantile<number>
    | ScaleSequentialBase<number>
    | ScaleDiverging<number>
    | ScaleQuantize<number>
    | ScaleQuantile<number>
    | ScaleThreshold<IPrimitive, number>
    | ScaleOrdinal<Domain, number>
    | ScaleBand<Domain>
    | ScalePoint<Domain>;
