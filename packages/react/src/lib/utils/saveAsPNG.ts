import type { ITheme } from "@chart-io/types";

// Inspired by https://observablehq.com/@bumbeishvili/foreignobject-exporting-issue

/**
 * Serialize an SVG so that we can export as an image
 * @param {Node} svg     The SVG node
 * @return {string} The string representation of the SVG
 */
function serializeSVG(svg: HTMLElement) {
    // Create a clone of the node before we start
    const clone = svg.cloneNode(true) as HTMLElement;

    const fragment = window.location.href + "#";

    // Walk through the nodes in the tree
    const walker = document.createTreeWalker(clone, NodeFilter.SHOW_ELEMENT, null);
    while (walker.nextNode()) {
        for (const attr of (walker.currentNode as HTMLElement).attributes) {
            if (attr.value.includes(fragment)) {
                attr.value = attr.value.replace(fragment, "#");
            }
        }
    }

    clone.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
    clone.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

    const serializer = new XMLSerializer();
    return serializer.serializeToString(clone);
}

/**
 * Save the current window to an image
 * @param {String} url          The URL to save
 * @param {String} filename     The name of the file to save to
 */
function save(url, filename) {
    const link = document.createElement("a");

    if (typeof link.download === "string") {
        // Firefox requires the link to be in the body
        document.body.appendChild(link);

        link.download = filename;
        link.href = url;
        link.click();

        document.body.removeChild(link);
    } else {
        location.replace(url);
    }
}

/**
 * Saves the given node as a PNG
 * @param {HTMLElement} svgNode The SVG node to save
 * @param {ITheme} theme        The current theme of the chart
 * @param {string} filename     The name of the file to save
 */
export const saveAsPNG = (svgNode: HTMLElement, theme: ITheme, filename: string) => {
    const scale = 1;
    const image = new Image();

    image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.parentNode;

        const boundingRect = svgNode.getBoundingClientRect();
        const scaledWidth = boundingRect.width * scale;
        const scaledHeight = boundingRect.height * scale;

        canvas.width = scaledWidth;
        canvas.height = scaledHeight;

        const context = canvas.getContext("2d");
        if (context) {
            context.fillStyle = theme.background.toString();
            context.fillRect(0, 0, scaledWidth, scaledHeight);
            context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

            // Save the image
            save(canvas.toDataURL("image/png"), filename);
        }
    };

    const url = "data:image/svg+xml; charset=utf8, " + encodeURIComponent(serializeSVG(svgNode));
    image.src = url; // URL.createObjectURL(blob);
};
