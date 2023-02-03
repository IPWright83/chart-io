import { calculateScale } from "./calculateScale";

describe("calculateScale", () => {
    it("correctly assigns a manual scale", () => {
        const data = [{ x: 27 }, { x: 29 }, { x: 32 }];
        const scale = calculateScale(data, ["x"], [0, 200], [25, 50], false, "linear");

        expect(scale.domain()).toEqual([24, 50]);
        expect(scale.range()).toEqual([0, 200]);
        expect(scale(25).toFixed(2)).toEqual("7.69");
        expect(scale(50)).toEqual(200);
    });

    it("creates a linear scale for numbers", () => {
        const data = [{ x: 15 }, { x: 54 }, { x: 99 }];
        const scale = calculateScale(data, ["x"], [0, 200], null, false);

        expect(scale.domain()).toEqual([0, 100]);
        expect(scale.range()).toEqual([0, 200]);
        expect(scale(15)).toEqual(30);
        expect(scale(99)).toEqual(198);
    });

    it("creates a linear scale and aggregates numbers correctly", () => {
        const data = [
            { x: 15, x2: 5 },
            { x: 54, x2: 10 },
            { x: 99, x2: 10 },
        ];
        const scale = calculateScale(data, ["x", "x2"], [0, 200], null, true);

        expect(scale.domain()).toEqual([0, 110]);
        expect(scale.range()).toEqual([0, 200]);
        expect(scale(20).toFixed(2)).toEqual("36.36");
        expect(scale(109).toFixed(2)).toEqual("198.18");
    });

    it("creates a time scale for dates", () => {
        const data = [{ x: new Date("2022-07-23") }, { x: new Date("2022-07-24") }, { x: new Date("2022-07-25") }];
        const scale = calculateScale(data, ["x"], [0, 200], null, false);

        expect(scale.domain()).toEqual([new Date("2022-07-23"), new Date("2022-07-25")]);
        expect(scale.range()).toEqual([0, 200]);
        expect(scale(new Date("2022-07-23"))).toEqual(0);
        expect(scale(new Date("2022-07-25"))).toEqual(200);
    });

    it("creates a band scale for strings", () => {
        const data = [{ x: "a" }, { x: "b" }, { x: "c" }];
        const scale = calculateScale(data, ["x"], [0, 200], null, false);

        expect(scale.domain()).toEqual(["a", "b", "c"]);
        expect(scale.range()).toEqual([0, 200]);

        // @ts-ignore: TODO: How to fix this?
        expect(scale("a").toFixed(2)).toEqual("3.23");

        // @ts-ignore: TODO: How to fix this?
        expect(scale("c").toFixed(2)).toEqual("132.26");
    });

    it("creates a band scale for booelans", () => {
        const data = [{ x: true }, { x: false }];
        // @ts-ignore: TODO: How to fix this?
        const scale = calculateScale(data, ["x"], [0, 200], null, false);

        expect(scale.domain()).toEqual([true, false]);
        expect(scale.range()).toEqual([0, 200]);
        // @ts-ignore: TODO: How to fix this?
        expect(scale(true).toFixed(2)).toEqual("4.76");
        // @ts-ignore: TODO: How to fix this?
        expect(scale(false)).toEqual(100);
    });
});
