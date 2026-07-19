export interface IArcAngles {
    startAngle: number;
    endAngle: number;
    innerRadius: number;
    outerRadius: number;
}

/**
 * Linearly interpolates between two sets of arc angles/radii. Used to animate the transition
 * of a Pie/Donut slice between its previous and next state
 * @param  previous     The previous angles/radii for the slice
 * @param  target       The target angles/radii for the slice
 * @param  t            The progress of the transition, between 0-1
 * @return              The interpolated angles/radii
 */
export function interpolateArc(previous: IArcAngles, target: IArcAngles, t: number): IArcAngles {
    return {
        startAngle: previous.startAngle + (target.startAngle - previous.startAngle) * t,
        endAngle: previous.endAngle + (target.endAngle - previous.endAngle) * t,
        innerRadius: previous.innerRadius + (target.innerRadius - previous.innerRadius) * t,
        outerRadius: previous.outerRadius + (target.outerRadius - previous.outerRadius) * t,
    };
}
