import { themes } from "../../themes";
import type { ITheme } from "../../types";

/**
 * Gets the theme from the name
 * @param  {String|Object} theme    Either the name of a theme, or a custom theme object
 * @return {Object}                 The theme
 */
const getTheme = (theme: "light" | "dark" | ITheme): ITheme => {
    switch (theme) {
        case "light":
            return themes.light;
        case "dark":
            return themes.dark;
        default:
            return theme;
    }
};

export { getTheme };
