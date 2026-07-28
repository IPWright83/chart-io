import { hasCenterHolePlot } from "./hasCenterHolePlot";

const Donut = { props: {}, type: { hasCenterHole: true } };
const Pie = { props: {}, type: { hasCenterHole: undefined } };
const NullComponent = null;

describe("hasCenterHolePlot", () => {
    it("should return true if a plot with a center hole is present", () => {
        expect(hasCenterHolePlot([Pie, Donut])).toBe(true);
    });

    it("should return false if no plot with a center hole is present", () => {
        expect(hasCenterHolePlot([Pie, NullComponent])).toBe(false);
    });

    it("should return false if there are no children", () => {
        expect(hasCenterHolePlot(undefined)).toBe(false);
    });
});
