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

        it("returns null with no position", () => {
            expect(eventSelectors.position({})).toBe(null);
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
});
