import { Types } from "../Types";

import { getColumnInfos } from "./getColumnInfos";
import { getDataCardinality } from "./getDataCardinality";
import { getDataPointCount } from "./getDataPointCount";
import { getMaxStringLength } from "./getMaxStringLength";
import { getNullCount } from "./getNullCount";

describe("/detection/getInfos", () => {
    it("getDataPointCount returns correct count", () => {
        expect(getDataPointCount([])).toBe(0);
        expect(getDataPointCount([1, 2, 3])).toBe(3);
    });

    it("getNullCount returns correct count", () => {
        expect(getNullCount([])).toBe(0);
        expect(getNullCount([1, 2, 3])).toBe(0);
        expect(getNullCount([1, 2, null, 3])).toBe(1);
        expect(getNullCount([null, null, null])).toBe(3);
    });

    it("getDataCardinality returns correct cardinality", () => {
        expect(getDataCardinality([1, 2, 3])).toBe(3);
        expect(getDataCardinality([1, 2, 2])).toBe(2);
        expect(getDataCardinality([])).toBe(0);
    });

    it("getMaxStringLength returns correct value", () => {
        expect(getMaxStringLength([])).toBe(0);
        expect(getMaxStringLength(["a", "b"])).toBe(1);
        expect(getMaxStringLength(["abc", "qwerty", "ag"])).toBe(6);
    });

    describe("getColumnInfos", () => {
        it("returns nothing for an empty dataset", () => {
            const result = getColumnInfos([]);
            expect(result).toEqual({});
        });

        it("returns correct info for a String column", () => {
            const data = [{ s: "abc" }, { s: "qwerty" }, { s: "ag" }, { s: null }];
            const result = getColumnInfos(data);

            expect(result).toEqual([
                {
                    key: "s",
                    cardinality: 4,
                    count: 4,
                    maxLength: 6,
                    nullCount: 1,
                    type: Types.String,
                },
            ]);
        });

        it("returns correct info for a Number column", () => {
            const data = [{ n: 24.3 }, { n: 6 }, { n: null }, { n: 235.123 }];
            const result = getColumnInfos(data);

            expect(result).toEqual([
                {
                    key: "n",
                    cardinality: 4,
                    count: 4,
                    nullCount: 1,
                    type: Types.Double,
                    isAllNegative: false,
                    isAllPositive: true,
                    isPossiblePercentage: false,
                    isPossibleCurrency: false,
                    range: [0, 235.123],
                },
            ]);
        });

        it("returns correct info for a Date column", () => {
            const data = [
                { d: "2021-05-15T09:59:54.378Z" },
                { d: "2021-05-16T09:59:54.378Z" },
                { d: null },
                { d: "2021-05-17T09:59:54.378Z" },
            ];
            const result = getColumnInfos(data);

            expect(result).toEqual([
                {
                    key: "d",
                    cardinality: 4,
                    count: 4,
                    nullCount: 1,
                    type: Types.DateTime,
                    range: [1621072794378, 1621245594378],
                },
            ]);
        });
    });
});
