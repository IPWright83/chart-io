import { areValuesUnique } from "./areValuesUnique";
import { isNullOrUndefined } from "./isNullOrUndefined";
import { getXYFromTransform } from "./getXYFromTransform";

describe("utils", () => {
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

    describe("isNullOrUndefined", () => {
        it("returns true if the value is null", () => {
            expect(isNullOrUndefined(null)).toBe(true);
        });

        it("returns true if the value is undefined", () => {
            expect(isNullOrUndefined(undefined)).toBe(true);
        });

        it("returns false if neither null or undefined", () => {
            expect(isNullOrUndefined(true)).toBe(false);
            expect(isNullOrUndefined(false)).toBe(false);
            expect(isNullOrUndefined(0)).toBe(false);
            expect(isNullOrUndefined("")).toBe(false);
            expect(isNullOrUndefined([])).toBe(false);
        });
    });

    describe("getXYFromTransform", () => {
        describe("returns the x,y part of a transform string", () => {
            it("when just transformed", () => {
                expect(getXYFromTransform("translate(50, 28)")).toEqual({ x: 50, y: 28 });
            });
            it("when also rotated", () => {
                expect(getXYFromTransform("translate(50, 28)rotate(-45)")).toEqual({ x: 50, y: 28 });
            });
            it("when rotated first", () => {
                expect(getXYFromTransform("rotate(-45)translate(50, 28)")).toEqual({ x: 50, y: 28 });
            });
        });

        describe("return 0,0", () => {
            it("when no transform provided", () => {
                expect(getXYFromTransform("rotate(90)")).toEqual({ x: 0, y: 0 });
            });

            it("when no translation in the transform", () => {
                expect(getXYFromTransform(null)).toEqual({ x: 0, y: 0 });
            });
        });
    });
});
