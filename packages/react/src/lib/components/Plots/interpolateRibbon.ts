export interface IRibbonAngles {
    sourceStartAngle: number;
    sourceEndAngle: number;
    targetStartAngle: number;
    targetEndAngle: number;
}

/**
 * Linearly interpolates between two sets of ribbon angles. Used to animate the transition of a
 * `<Chord>` ribbon between its previous and next state, the same way `interpolateArc` animates a
 * Pie/Donut slice
 * @param  previous     The previous angles for the ribbon
 * @param  target       The target angles for the ribbon
 * @param  t            The progress of the transition, between 0-1
 * @return              The interpolated angles
 */
export function interpolateRibbon(previous: IRibbonAngles, target: IRibbonAngles, t: number): IRibbonAngles {
    return {
        sourceStartAngle: previous.sourceStartAngle + (target.sourceStartAngle - previous.sourceStartAngle) * t,
        sourceEndAngle: previous.sourceEndAngle + (target.sourceEndAngle - previous.sourceEndAngle) * t,
        targetStartAngle: previous.targetStartAngle + (target.targetStartAngle - previous.targetStartAngle) * t,
        targetEndAngle: previous.targetEndAngle + (target.targetEndAngle - previous.targetEndAngle) * t,
    };
}
