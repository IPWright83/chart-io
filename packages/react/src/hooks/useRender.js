import { useEffect, useState } from "react";

/**
 * Trigger the rendering of a layer asynchronously. This is useful
 * when we expect several store updates to happen asynchronously and
 * want to render afterwards.
 *
 * An example is when the data changes we calculate new a scales, which is done off the back
 * of a render. We need both the new data and new scale to reliably render a plot
 * @param {Function} callback       The actual render function
 * @param {Function} dependencies   The set of dependencies that should trigger a re-render
 */
const useRender = (callback, dependencies) => {
    const [renderID, setRenderID] = useState(null);

    useEffect(() => {
        // Cancel any previously scheduled render
        if (renderID) {
            clearTimeout(renderID);
        }

        // Queue up the next render
        const newRenderID = setTimeout(callback, 0);
        setRenderID(newRenderID);

        // WARNING:
        // We don't actually want to pass the callback or the renderID
        // in as dependencies as this breaks the useRender hook
    }, dependencies);
};

export { useRender };
