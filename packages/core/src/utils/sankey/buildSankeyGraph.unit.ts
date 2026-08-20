import { buildSankeyGraph } from "./buildSankeyGraph";

describe("/utils/sankey/buildSankeyGraph", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    const data = [
        { source: "Coal", stage: "Electricity", destination: "Homes", amount: 5 },
        { source: "Gas", stage: "Electricity", destination: "Homes", amount: 3 },
        { source: "Gas", stage: "Electricity", destination: "Industry", amount: 2 },
    ];

    it("should build one node per distinct value at each level", () => {
        const { nodes } = buildSankeyGraph(data, ["source", "stage", "destination"], "amount", "unit_test");

        expect(nodes.map((node) => node.id)).toEqual([
            "0:Coal",
            "1:Electricity",
            "2:Homes",
            "0:Gas",
            "2:Industry",
        ]);
        expect(nodes.map((node) => node.key)).toEqual(["Coal", "Electricity", "Homes", "Gas", "Industry"]);
    });

    it("should namespace node ids by level, so the same value at different levels is kept distinct", () => {
        const overlapping = [
            { source: "Other", target: "Other", amount: 5 },
            { source: "A", target: "B", amount: 2 },
        ];

        const { nodes } = buildSankeyGraph(overlapping, ["source", "target"], "amount", "unit_test");

        expect(nodes.map((node) => node.id)).toEqual(["0:Other", "1:Other", "0:A", "1:B"]);
    });

    it("should build a link between every consecutive pair of levels", () => {
        const { links } = buildSankeyGraph(data, ["source", "stage", "destination"], "amount", "unit_test");

        expect(links).toEqual([
            { source: "0:Coal", target: "1:Electricity", value: 5 },
            { source: "1:Electricity", target: "2:Homes", value: 8 },
            { source: "0:Gas", target: "1:Electricity", value: 5 },
            { source: "1:Electricity", target: "2:Industry", value: 2 },
        ]);
    });

    it("should sum values into a single link when the same source/target pair repeats", () => {
        const repeated = [
            { source: "A", target: "B", amount: 5 },
            { source: "A", target: "B", amount: 3 },
        ];

        const { links } = buildSankeyGraph(repeated, ["source", "target"], "amount", "unit_test");

        expect(links).toEqual([{ source: "0:A", target: "1:B", value: 8 }]);
    });

    it("should carry a synthetic { [field]: key } datum for every node", () => {
        const { nodes } = buildSankeyGraph(data, ["source", "stage", "destination"], "amount", "unit_test");

        expect(nodes.find((node) => node.id === "0:Coal")?.datum).toEqual({ source: "Coal" });
        expect(nodes.find((node) => node.id === "1:Electricity")?.datum).toEqual({ stage: "Electricity" });
    });

    it("should treat negative values as 0 and log a W009 warning", () => {
        const spy = jest.spyOn(console, "warn").mockImplementation(jest.fn());

        const negativeData = [{ source: "A", target: "B", amount: -5 }];

        const { links } = buildSankeyGraph(negativeData, ["source", "target"], "amount", "unit_test");

        expect(links).toEqual([{ source: "0:A", target: "1:B", value: 0 }]);
        expect(spy.mock.calls[0][0]).toBe(
            "@chart-io encountered an warning. W009: Negative values in the amount field aren't supported by <unit_test> and have been treated as 0.. You can read more about this https://ipwright83.github.io/chart-io/?path=/docs/errors-warnings-warnings-W009.",
        );
    });

    it("should not warn when there are no negative values", () => {
        const spy = jest.spyOn(console, "warn").mockImplementation(jest.fn());

        buildSankeyGraph(data, ["source", "stage", "destination"], "amount", "unit_test");

        expect(spy).not.toHaveBeenCalled();
    });
});
