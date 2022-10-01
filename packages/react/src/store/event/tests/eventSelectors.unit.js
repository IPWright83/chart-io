import { eventSelectors } from "../eventSelectors";

describe("eventSelectors", () => {
    it("store gets the correct part of state", () => {
        const state = {
            event: {
                mouse: {},
            },
        };

        expect(eventSelectors.store(state)).toEqual(state.event);
    });

    describe("position", () => {
        it("returns the data", () => {
            const state = {
                event: {
                    mouse: { x: 5, y: 10 },
                },
            };

            expect(eventSelectors.position(state)).toEqual({ x: 5, y: 10 });
        });

        it("returns empty with no position", () => {
            expect(eventSelectors.position({})).toEqual({});
        });
    });

    describe("mode", () => {
        it("returns NONE if there is no mouse position", () => {
            expect(eventSelectors.mode({})).toBe("NONE");
        });

        it("returns the mode", () => {
            const state = {
                event: {
                    mouse: { x: 5, y: 10, mode: "ENTER" },
                },
            };
            expect(eventSelectors.mode(state)).toBe("ENTER");
        });
    });

    it("droplines", () => {
        const state = {
            event: {
                droplines: [{ isHorizontal: true, color: "red", x1: 0, x2: 1, y1: 2, y2: 3 }],
            },
        };

        expect(eventSelectors.droplines(state)).toEqual([
            { isHorizontal: true, color: "red", x1: 0, x2: 1, y1: 2, y2: 3 },
        ]);
    });

    it("markers", () => {
        const state = {
            event: {
                markers: [{ fill: "red", r1: 5, r2: 10, cx: 3, cy: 4 }],
            },
        };

        expect(eventSelectors.markers(state)).toEqual([{ fill: "red", r1: 5, r2: 10, cx: 3, cy: 4 }]);
    });

    describe("tooltip", () => {
        it("show returns true if there are tooltip items", () => {
            const state = {
                event: {
                    tooltip: {
                        items: [{ name: "A", value: 0 }],
                    },
                },
            };

            expect(eventSelectors.tooltip.show(state)).toBe(true);
        });

        it("show returns false if there are no tooltip items", () => {
            const state = {
                event: {
                    tooltip: {
                        items: [],
                    },
                },
            };

            expect(eventSelectors.tooltip.show(state)).toBe(false);
        });

        it("color", () => {
            const state = {
                event: {
                    tooltip: {
                        items: [{ name: "A", value: 0 }],
                        color: "#FF0000",
                    },
                },
            };

            expect(eventSelectors.tooltip.color(state)).toBe("#FF0000");
        });

        it("items", () => {
            const state = {
                event: {
                    tooltip: {
                        items: [{ name: "A", value: 0 }],
                        color: "#FF0000",
                    },
                },
            };

            expect(eventSelectors.tooltip.items(state)).toEqual([{ name: "A", value: 0 }]);
        });

        it("position", () => {
            const state = {
                event: {
                    tooltip: {
                        items: [{ name: "A", value: 0 }],
                        position: { x: 5, y: 10 },
                    },
                },
            };

            expect(eventSelectors.tooltip.position(state)).toEqual({ x: 5, y: 10 });
        });
    });
});
