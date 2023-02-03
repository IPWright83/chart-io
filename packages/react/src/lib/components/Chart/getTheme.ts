import type { ITheme } from "@d3-chart/types";
import { themes } from "../../themes";

/**
 * Gets the theme from the name
 * @param  theme   Either the name of a theme, or a custom theme object
 * @return         The theme
 */
export function getTheme(theme: ITheme | "light" | "dark"): ITheme {
    switch (theme) {
        case "light":
            return themes.light;
        case "dark":
            return themes.dark;
        default:
            return theme;
    }
}
