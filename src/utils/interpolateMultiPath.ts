import { interpolatePath } from "d3-interpolate-path";

type IInterpolateFunc = (t: number) => string;

// https://codesandbox.io/s/d3-interpolate-path-multi-example-8l32q?file=/src/index.js:49-103
export const interpolateMultiPath = (
  a: string,
  b: string
): IInterpolateFunc => {
  // Split into parts by M
  const aSubpaths = a.split(/(?=M)/g);
  const bSubpaths = b.split(/(?=M)/g);

  const maxSubpaths = Math.max(a.length, b.length);
  const interpolators = [];
  for (let i = 0; i < maxSubpaths; ++i) {
    interpolators.push(interpolatePath(aSubpaths[i], bSubpaths[i]));
  }

  return function interpolate(t: number): string {
    const parts = [];
    for (let i = 0; i < interpolators.length; ++i) {
      parts[i] = interpolators[i](t);
    }

    return parts.join(" ");
  };
};
