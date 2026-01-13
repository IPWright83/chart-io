/**
 * Obtain the x, y offsets from a transform string
 * @param  {String} transform    The transform string
 * @return {Object}              The x,y offsets
 */
const getXYFromTransform = (transform) => {
    if (transform) {
    
        const result = transform.match(/translate\(([\d.]+),([\d.]+)\)/);
        if (result) {
            return { x: +result[1], y: +result[2] };
        }
    }

    return { x: 0, y: 0 };
};

export { getXYFromTransform };
