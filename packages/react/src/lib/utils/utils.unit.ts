import * as d3 from "@chart-io/d3";
import type { AnyAction, Store } from "redux";
import { IScale } from "@chart-io/types";

import { logAndThrowError, logDebug, logError, logWarning } from "./logger";
import { areValuesUnique } from "./areValuesUnique";
import { getBandwidthAndOffset } from "./getBandwidthAndOffset";
import { getXYFromTransform } from "./getXYFromTransform";
import { isNullOrUndefined } from "./isNullOrUndefined";
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

    describe("getBandwidthAndOffset", () => {
        it("returns the scale bandwidth and 0 offset if the scale has a bandwidth function", () => {
            const scale = { bandwidth: () => 5 } as IScale;

            expect(getBandwidthAndOffset(scale, "x", [])).toEqual({
                bandwidth: 5,
                offset: 0,
            });
        });

        it("should calculate a bandwidth and offset if the scale has no bandwidth function", () => {
            const scale = d3.scaleLinear().domain([0, 100]).range([0, 100]);
            const data = [{ x: 0 }, { x: 50 }];

            expect(getBandwidthAndOffset(scale, "x", data)).toEqual({
                bandwidth: 46,
                offset: 23,
            });
        });

        it("should return no bandwidth and offset if there aren't enough data points to calculate", () => {
            const scale = d3.scaleLinear().domain([0, 100]).range([0, 100]);
            const data = [{ x: 0 }];

            expect(getBandwidthAndOffset(scale, "x", data)).toEqual({
                bandwidth: 0,
                offset: 0,
            });
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
            }).toThrow(new Error("The linkStores() function can strictly only be called once during initialisation"));
        });
    });

    describe("logger", () => {
        it("logWarning outputs correctly to the console", () => {
            const spy = jest.spyOn(console, "warn");

            logWarning("W100", "Foobar");

            expect(spy).toHaveBeenCalledWith(
                "@chart-io/react encountered an warning. W100: Foobar. You can read more about this https://ipwright83.github.io/chart-io/?path=/docs/errors-warnings-warnings-W100."
            );
        });

        it("logDebug outputs correctly to the console", () => {
            const spy = jest.spyOn(console, "debug");

            logDebug("Foobar");

            expect(spy).toHaveBeenCalledWith("@chart-io/react", "Foobar", []);
        });

        it("logError outputs correctly to the console", () => {
            const spy = jest.spyOn(console, "error");

            logError("E100", "Foobar");

            expect(spy).toHaveBeenCalledWith(
                "@chart-io/react encountered an error. E100: Foobar. You can read more about this https://ipwright83.github.io/chart-io/?path=/docs/errors-warnings-errors-E100."
            );
        });

        it("logAndThrowError outputs correctly to the console and throws an error", () => {
            const spy = jest.spyOn(console, "error");

            expect(() => {
                logAndThrowError("E100", "Foobar");
            }).toThrow("Foobar");

            expect(spy).toHaveBeenCalledWith(
                "@chart-io/react encountered an error. E100: Foobar. You can read more about this https://ipwright83.github.io/chart-io/?path=/docs/errors-warnings-errors-E100."
            );
        });
    });
});
