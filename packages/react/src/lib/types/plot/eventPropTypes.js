import PropTypes from "prop-types";

/**
 * PropTypes that are common broadly common for Props
 * @type {Object}
 */
const eventPropTypes = {
    /**
     * A function that will be triggered whenever the mouse moves over an element for the first time
     * @default `() => {}`
     * @type {Function}
     */
    onMouseOver: PropTypes.func,

    /**
     * A function that will be triggered whenever the mouse moves out an element
     * @default `() => {}`
     * @type {Function}
     */
    onMouseOut: PropTypes.func,

    /**
     * A function that will be triggered whenever the mouse clicks on an element
     * @default `() => {}`
     * @type {Function}
     */
    onClick: PropTypes.func,
};

export { eventPropTypes };
