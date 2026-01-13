import React from "react";

import { ThemeSelector } from "./ThemeSelector";

/**
 * Wraps a React component to add a css theme import
 * @param  {ReactElement} WrappedComponent     The component to render
 * @return {ReactElement}                      The wrapped component
 */
const withTheme = (WrappedComponent) =>
    /**
     * Wraps a component within a Redux store provider
     * @param  {...any}    options.props        All the props
     * @return {ReactElement}              The wrapped componet
     */
    ({ theme = "light", ...props }) => {
        return (
            <ThemeSelector theme={theme}>
                <WrappedComponent theme={theme} {...props} />
            </ThemeSelector>
        );
    };

export { withTheme };
