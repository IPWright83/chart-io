import PropTypes from "prop-types";

/**
 * PropTypes that are common broadly common for Props
 * @type {Object}
 */
const plotPropTypes = {
    /**
     * The layer to be rendered upon. Typically this is an `<svg:g>` or a fake HTMLElement when using canvas.
     * @default undefined
     * @type {HTMLElement}
     */
    layer: PropTypes.object,

    /**
     * The key of the field used for the x position
     * @type {String}
     */
    x: PropTypes.string.isRequired,

    /**
     * The key of the field used for the y position
     * @type {String}
     */
    y: PropTypes.string.isRequired,

    /**
     * The color to use for the points
     * @type {String}
     */
    color: PropTypes.string,

    /**
     * The opacity to use for the Plot
     * @type {Number}
     */
    opacity: PropTypes.number,
};

export { plotPropTypes };
