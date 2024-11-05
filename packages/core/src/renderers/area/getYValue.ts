import * as d3 from "@chart-io/d3";
import type { IBandwidthScale, INumericValue } from "@chart-io/types";

import { isNullOrUndefined } from "../../utils";

/**
 * Obtain the Y screen co-ordinate for a point on an area chart
 * @return {number}   The co-ordinate
 */
export function getYValue({ curve, xScale, yScale, datum, y, y2, x, data }): number {
  // When there is no curve function we can simply return the value
  // directly from the scale
  if (!curve) {
    return +yScale(datum[y] as INumericValue);
  }

  // If we have a curve factory we need to return the path which is used
  // to calculate positions taking the curveFactory into account.
  // This is required for positioning tooltips and markers because the scales
  // will not directly match up with the curved path
  const bandwidth = (xScale as IBandwidthScale).bandwidth ? (xScale as IBandwidthScale).bandwidth() / 2 : 0;
  const area = d3
    .area()
    .curve(curve)
    .x((d) => xScale(d[x]) + bandwidth)
    .y0((d) => (y2 ? yScale(d[y]) : yScale.range()[0]))
    .y1((d) => (y2 ? yScale(d[y2]) : yScale(d[y])))
    .defined((d) => !isNullOrUndefined(d[y]));

  // Once we have a path we can approximate the y value
  const path = area(data);
  console.log(curve, path);

  return SVGPathInterpolator(path, 0.1)(datum[x])
};

// https://observablehq.com/@andreasplesch/svg-path-sampler
function SVGPathInterpolator(path, eps, maxIter) {
  const safeIter = maxIter || 100;
  const epsilon = eps || 0.00001;
  const pathString = path || "M0,0L1,1";
  const area = svg`
    <svg>
      <path d='${pathString}' />
    </svg>`
  const svgpath = area.querySelector('path');
  svgpath.setAttribute('d', pathString);
  const totalLength = svgpath.getTotalLength();
  const minPoint = svgpath.getPointAtLength(0);
  const maxPoint = svgpath.getPointAtLength(totalLength);
  let reverse = maxPoint.x < minPoint.x;
  const range = reverse ? [maxPoint, minPoint] : [minPoint, maxPoint];
  reverse = reverse ? -1 : 1;
  return function interpolator(x) {
    const targetX = x === 0 ? 0 : x || minPoint.x; // check for 0 and null/undefined
    if (targetX < range[0].x) return range[0]; // clamp
    if (targetX > range[1].x) return range[1];
    const estimatedLength = estimateLength(totalLength / 2, 0, totalLength);
    return estimatedLength ? svgpath.getPointAtLength(estimatedLength) : false;
    function estimateLength(l, mn, mx) {
      let delta = svgpath.getPointAtLength(l).x - targetX;
      let next_delta = 0;
      let iter = 0;
      while (Math.abs(delta) > epsilon) {
        if (iter++ > safeIter) return false;
        if (reverse * delta < 0) { mn = l; l = (l + mx) / 2; }
        else { mx = l; l = (mn + l) / 2; }
        next_delta = svgpath.getPointAtLength(l).x - targetX;
        delta = next_delta;
      }
      return l;
    }
  }
}
