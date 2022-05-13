import { themes } from "../../themes";

/**
 * Gets the theme from the name
 * @param  {String|Object} theme    Either the name of a theme, or a custom theme object
 * @return {Object}                 The theme
 */
const getTheme = (theme) => {
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
