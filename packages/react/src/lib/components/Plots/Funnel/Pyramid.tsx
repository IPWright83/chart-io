import React, { forwardRef } from "react";

import { IChartRef } from "../../Chart";

import { Funnel, IFunnelProps } from "./Funnel";

export type IPyramidProps = Omit<IFunnelProps, "inverted">;

/**
 * Represents a Pyramid chart - a Funnel turned upside down, so the widest segment forms the flat
 * base at the bottom and the narrowest sits at the top. Accepts the same props as `<Funnel>`,
 * except `inverted` - a Pyramid, by definition, is always inverted, so it isn't exposed
 * @param  props       The set of React properties
 * @return             The Pyramid component
 */
export const Pyramid = forwardRef<IChartRef, IPyramidProps>((props, ref) => {
    return <Funnel ref={ref} {...props} inverted={true} />;
});

Pyramid.displayName = "Pyramid";
