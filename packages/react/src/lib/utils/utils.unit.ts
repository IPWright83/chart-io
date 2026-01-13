import type { Store, AnyAction } from "redux";

import { areValuesUnique } from "./areValuesUnique";
import { isNullOrUndefined } from "./isNullOrUndefined";
import { getXYFromTransform } from "./getXYFromTransform";
import { linkStores } from "./linkStores";

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

    describe("linkStores", () => {
        it("correctly dispatches event from store 1 to other stores", () => {
            const dispatch1 = jest.fn();
            const dispatch2 = jest.fn();
            const dispatch3 = jest.fn();

            const store1 = { dispatch: dispatch1 } as unknown as Store<any, AnyAction>;
            const store2 = { dispatch: dispatch2 } as unknown as Store<any, AnyAction>;
            const store3 = { dispatch: dispatch3 } as unknown as Store<any, AnyAction>;

            linkStores([store1, store2, store3]);

            const action = { type: "EVENT.MOUSE_MOVE" };
            store1.dispatch(action);

            expect(dispatch1).toHaveBeenCalledWith(action);
            expect(dispatch2).toHaveBeenCalledWith(action);
            expect(dispatch3).toHaveBeenCalledWith(action);
        });

        it("correctly dispatches event from store 2 to other stores", () => {
            const dispatch1 = jest.fn();
            const dispatch2 = jest.fn();
            const dispatch3 = jest.fn();

            const store1 = { dispatch: dispatch1 } as unknown as Store<any, AnyAction>;
            const store2 = { dispatch: dispatch2 } as unknown as Store<any, AnyAction>;
            const store3 = { dispatch: dispatch3 } as unknown as Store<any, AnyAction>;

            linkStores([store1, store2, store3]);

            const action = { type: "EVENT.MOUSE_MOVE" };
            store2.dispatch(action);

            expect(dispatch1).toHaveBeenCalledWith(action);
            expect(dispatch2).toHaveBeenCalledWith(action);
            expect(dispatch3).toHaveBeenCalledWith(action);
        });

        it("correctly ignores an event based on the filter", () => {
            const dispatch1 = jest.fn();
            const dispatch2 = jest.fn();
            const dispatch3 = jest.fn();

            const store1 = { dispatch: dispatch1 } as unknown as Store<any, AnyAction>;
            const store2 = { dispatch: dispatch2 } as unknown as Store<any, AnyAction>;
            const store3 = { dispatch: dispatch3 } as unknown as Store<any, AnyAction>;

            linkStores([store1, store2, store3], /FOO_EVENTS/);

            const action = { type: "EVENT.MOUSE_MOVE" };
            store1.dispatch(action);

            expect(dispatch1).toHaveBeenCalledWith(action);
            expect(dispatch2).not.toHaveBeenCalled();
            expect(dispatch3).not.toHaveBeenCalled();
        });

        it("throws an error if trying to initialise a 2nd time", () => {
            const dispatch1 = jest.fn();
            const dispatch2 = jest.fn();
            const dispatch3 = jest.fn();

            const store1 = { dispatch: dispatch1 } as unknown as Store<any, AnyAction>;
            const store2 = { dispatch: dispatch2 } as unknown as Store<any, AnyAction>;
            const store3 = { dispatch: dispatch3 } as unknown as Store<any, AnyAction>;

            linkStores([store1, store2, store3]);

            expect(() => {
                linkStores([store1, store2, store3]);
            }).toThrow(new Error("This function can strictly only be called once during initialisation"));
        });
    });
});
