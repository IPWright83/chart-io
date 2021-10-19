/**
 * Gets the name of the theme
 * @param  {String|Object} theme    Either the name of a theme, or a custom theme object
 * @return {String}                 The name of the theme or null
 */
const getThemeName = (theme) => {
    switch (theme) {
        case "light":
        case "dark":
            return theme;
        default:
            return null;
    }
};

export { getThemeName };
