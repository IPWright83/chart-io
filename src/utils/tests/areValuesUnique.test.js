import { areValuesUnique } from "../areValuesUnique";

describe("areValuesUnique", () => {
    it("returns true if all values are unique", () => {
        expect(areValuesUnique([1, 2, 3, 4, 5])).toBe(true);
    });

    it("returns true for no data", () => {
        expect(areValuesUnique(undefined)).toBe(true);
    });

    it("returns false if there is a duplicate value", () => {
        expect(areValuesUnique([1, 2, 3, 4, 1])).toBe(false);
    });
});
