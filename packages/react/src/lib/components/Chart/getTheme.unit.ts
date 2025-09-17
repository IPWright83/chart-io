import type { ITheme } from "@chart-io/core";
import { themes } from "@chart-io/core";

import { getTheme } from "./getTheme";

describe("getTheme", () => {
    it("should return light theme for string light", () => {
        expect(getTheme("light")).toBe(themes.light);
    });

    it("should return dark theme for string dark", () => {
        expect(getTheme("dark")).toBe(themes.dark);
    });

    it("should return custom theme for an object", () => {
        const custom = {} as ITheme;
        expect(getTheme(custom)).toBe(custom);
    });
});
