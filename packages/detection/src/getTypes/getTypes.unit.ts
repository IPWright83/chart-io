import { getDataType } from "./getDataType";
import { Type } from "../Type";

describe("getTypes", () => {
    // Helper to call on an array
    const detectType = (values: any[]) =>
        values.reduce((previousType, value) => getDataType(value, previousType), Type.Unknown);

    it("should return unknown with no values nulls", () => {
        const values: string[] = [];
        expect(detectType(values)).toBe(Type.Unknown);
    });

    it("should detect nulls", () => {
        const values = [null, null, null];
        expect(detectType(values)).toBe(Type.Null);
    });

    it("should detect booleans", () => {
        const values = [true, "Yes", "NO", null, true];
        expect(detectType(values)).toBe(Type.Boolean);
    });

    it("should detect strings", () => {
        const values = ["a", null, "12.4", "4", "2021-05-15T09:59:54.378Z"];
        expect(detectType(values)).toBe(Type.String);
    });

    it("should detect integers", () => {
        const values = [3, 5, 123, null, -45, 45847];
        expect(detectType(values)).toBe(Type.Integer);
    });

    it("should detect doubles", () => {
        const values = [3.142, null, 5.436, 123.0, -45.2435, 45847];
        expect(detectType(values)).toBe(Type.Double);
    });

    it("should detect dates", () => {
        // Ensure to use a non DST date
        const values = ["2021-02-15", "2021-02-16", null, "2021-02-17T00:00:00.000Z"];
        expect(detectType(values)).toBe(Type.Date);
    });

    it("should detect dates objects", () => {
        // Ensure to use a non DST date
        const values = [new Date(2021, 2, 15), new Date(2021, 2, 16), null, new Date(2021, 2, 17)];
        expect(detectType(values)).toBe(Type.Date);
    });

    it("should detect datestimes", () => {
        const values = ["2021-05-15T09:59:54.378Z", "2021-05-16T09:59:54.378Z", null, "2021-05-17T09:59:54.378Z"];
        expect(detectType(values)).toBe(Type.DateTime);
    });
});
