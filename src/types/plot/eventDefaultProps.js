import emptyFunction from "emptyfunction";

/**
 * Default set of props used for various plots that support their own events
 * @type {Object}
 */
const eventDefaultProps = {
    onMouseOver: emptyFunction,
    onMouseOut: emptyFunction,
    onClick: emptyFunction,
};

export { eventDefaultProps };
