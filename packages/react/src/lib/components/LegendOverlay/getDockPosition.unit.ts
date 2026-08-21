import { getDockPosition } from "./getDockPosition";

describe("getDockPosition", () => {
    const width = 200;
    const height = 200;
    const cx = width / 2;
    const cy = height / 2;

    it("docks due East/West/North/South when dropped directly on that edge", () => {
        expect(getDockPosition(width, cy, width, height)).toBe("E");
        expect(getDockPosition(0, cy, width, height)).toBe("W");
        expect(getDockPosition(cx, 0, width, height)).toBe("N");
        expect(getDockPosition(cx, height, width, height)).toBe("S");
    });

    it("docks to the nearest corner", () => {
        expect(getDockPosition(width, 0, width, height)).toBe("NE");
        expect(getDockPosition(width, height, width, height)).toBe("SE");
        expect(getDockPosition(0, 0, width, height)).toBe("NW");
        expect(getDockPosition(0, height, width, height)).toBe("SW");
    });

    it("docks to the nearest position for a point that isn't exactly on an edge or corner", () => {
        // Just off-center to the top-right, but closer to due East than to North
        expect(getDockPosition(cx + 90, cy - 20, width, height)).toBe("E");
    });

    it("defaults to East for a point exactly on the center", () => {
        expect(getDockPosition(cx, cy, width, height)).toBe("E");
    });
});
