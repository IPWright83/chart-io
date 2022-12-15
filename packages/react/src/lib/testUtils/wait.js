// prettier-ignore

/**
 * Waits for a period of milli-seconds (wraps setTimeout in a Promise)
 * @param  {Number} duration    The number of milliseconds to wait
 * @return {Promise}            A promise that resolves after the set time
 */
export const wait = (duration = 200) => 
    new Promise((resolve) => 
        setTimeout(resolve, duration));
