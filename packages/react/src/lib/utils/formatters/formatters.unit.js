import { formatValue } from "./formatValue";

describe("utils/formatters", () => {
    it("correctly formats null", () => {
        expect(formatValue("", null)).toBe("-");
    });

    it("correctly formats undefined", () => {
        expect(formatValue("", undefined)).toBe("-");
    });

    // prettier-ignore
    describe("correctly formats numbers", () => {
        it("0.001", () => { expect(formatValue("", 0.001)).toBe("1m"); })
        it("0.01", () => { expect(formatValue("",0.01)).toBe("0.01"); })
        it("0.1", () => { expect(formatValue("",0.1)).toBe("0.1"); })
        it("1", () => { expect(formatValue("", 1)).toBe("1"); })
        it("10", () => { expect(formatValue("", 10)).toBe("10"); })
        it("100", () => { expect(formatValue("", 100)).toBe("100"); })
        it("1000", () => { expect(formatValue("", 1000)).toBe("1k"); })
        it("10000", () => { expect(formatValue("", 10000)).toBe("10k"); })
        it("100000", () => { expect(formatValue("", 100000)).toBe("100k"); })
        it("1000000", () => { expect(formatValue("", 1000000)).toBe("1M"); })
    });

    // prettier-ignore
    describe("correctly formats dates", () => {
        it("25/01/2023 19:00:10.005", () => { expect(formatValue("", new Date(2023, 0, 25, 19, 0, 10, 5))).toBe("25/01/2023 19:00:10.005"); });
        it("25/01/2023 19:00:10", () => { expect(formatValue("", new Date(2023, 0, 25, 19, 0, 10, 0))).toBe("25/01/2023 19:00:10"); });
        it("25/01/2023 19:00", () => { expect(formatValue("", new Date(2023, 0, 25, 19, 0, 0, 0))).toBe("25/01/2023 19:00"); });
        it("25/01/2023", () => { expect(formatValue("", new Date(2023, 0, 25, 0, 0, 0, 0))).toBe("25/01/2023"); });
        it("Jan 2023", () => { expect(formatValue("", new Date(2023, 0, 1, 0, 0, 0, 0))).toBe("Jan 2023"); });
        it("2023", () => { expect(formatValue("", new Date(2023, 0, 1, 0, 0, 0, 0))).toBe("2023"); });
    })

    it("correctly formats a string", () => {
        expect(formatValue("", "foobar")).toBe("foobar");
    });
});
