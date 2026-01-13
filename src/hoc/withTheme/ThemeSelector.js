import PropTypes from "prop-types";
import React from "react";

const LightTheme = React.lazy(() => import("./lightTheme"));
const DarkTheme = React.lazy(() => import("./darkTheme"));

/**
 * Include either the light or dark theme dynamically
 * @param  {String} options.theme       The name of the theme, either "light" or "dark"
 * @param  {Array} options.children     The children of the react component
 * @return {React}                  [description]
 */
const ThemeSelector = ({ theme, children }) => {
    return (
        <>
            <React.Suspense fallback={<></>}>
                {theme === "light" && <LightTheme />}
                {theme === "dark" && <DarkTheme />}
            </React.Suspense>
            {children}
        </>
    );
};

ThemeSelector.propTypes = {
    /** @type {String} The name of the theme to use */
    theme: PropTypes.oneOf(["light", "dark"]),
};

export { ThemeSelector };
