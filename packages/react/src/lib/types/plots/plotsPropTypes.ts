import PropTypes from "prop-types";

/**
 * PropTypes that are common broadly common for Props
 * @type {Object}
 */
const plotsPropTypes = {
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
     * The set of y fields to use to access the data for each plot
     * @type {Array<String>}
     */
    ys: PropTypes.arrayOf(PropTypes.string).isRequired,

    /**
     * The set of colors to use for the different plot
     * @type {Array<String>}
     */
    colors: PropTypes.arrayOf(PropTypes.string),
};

export { plotsPropTypes };
