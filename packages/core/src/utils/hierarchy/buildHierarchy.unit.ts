import { buildHierarchy } from "./buildHierarchy";

describe("/utils/hierarchy/buildHierarchy", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    const data = [
        { region: "North", product: "Widgets", sales: 5 },
        { region: "North", product: "Gadgets", sales: 5 },
        { region: "South", product: "Widgets", sales: 10 },
    ];

    it("should build one level per category, summing leaf values up through each level", () => {
        const root = buildHierarchy(data, ["region", "product"], "sales", false, "unit_test");

        expect(root.value).toBe(20);

        const [north, south] = root.children ?? [];
        expect(north.data.key).toBe("North");
        expect(north.value).toBe(10);
        expect(north.children?.map((child) => child.data.key)).toEqual(["Widgets", "Gadgets"]);

        expect(south.data.key).toBe("South");
        expect(south.value).toBe(10);
    });

    it("should carry the original row as the datum for leaf nodes", () => {
        const root = buildHierarchy(data, ["region", "product"], "sales", false, "unit_test");

        const [north] = root.children ?? [];
        const [widgets] = north.children ?? [];

        expect(widgets.data.datum).toBe(data[0]);
    });

    it("should carry a synthetic aggregate datum for non-leaf nodes", () => {
        const root = buildHierarchy(data, ["region", "product"], "sales", false, "unit_test");

        const [north] = root.children ?? [];

        expect(north.data.datum).toEqual({ region: "North", sales: 10 });
    });

    it("should leave nodes unsorted by default", () => {
        const root = buildHierarchy(data, ["region"], "sales", false, "unit_test");

        expect(root.children?.map((child) => child.data.key)).toEqual(["North", "South"]);
    });

    it("should sort nodes by value descending when sort is true", () => {
        const root = buildHierarchy(data, ["region"], "sales", true, "unit_test");

        expect(root.children?.map((child) => child.value)).toEqual([10, 10]);

        const smaller = [
            { region: "North", sales: 5 },
            { region: "South", sales: 15 },
        ];

        const sortedRoot = buildHierarchy(smaller, ["region"], "sales", true, "unit_test");
        expect(sortedRoot.children?.map((child) => child.data.key)).toEqual(["South", "North"]);
    });

    it("should treat negative values as 0 and log a W009 warning", () => {
        const spy = jest.spyOn(console, "warn").mockImplementation(jest.fn());

        const negativeData = [
            { region: "North", sales: -5 },
            { region: "South", sales: 10 },
        ];

        const root = buildHierarchy(negativeData, ["region"], "sales", false, "unit_test");

        const [north, south] = root.children ?? [];
        expect(north.value).toBe(0);
        expect(south.value).toBe(10);

        expect(spy.mock.calls[0][0]).toBe(
            "@chart-io encountered an warning. W009: Negative values in the sales field aren't supported by <unit_test> and have been treated as 0.. You can read more about this https://ipwright83.github.io/chart-io/?path=/docs/errors-warnings-warnings-W009.",
        );
    });

    it("should not warn when there are no negative values", () => {
        const spy = jest.spyOn(console, "warn").mockImplementation(jest.fn());

        buildHierarchy(data, ["region"], "sales", false, "unit_test");

        expect(spy).not.toHaveBeenCalled();
    });
});
