import type { ITheme } from "../types";

// Inspired by https://observablehq.com/@bumbeishvili/foreignobject-exporting-issue

/**
 * Genereates a set of images that will be used to replace
 * canvas elements. As canvas cannot be serialized from the SVG
 * to an image
 * @param {HTMLElement} svg The SVG node
 * @return {Array} An array of the images
 */
export function generateImages(svg: HTMLElement): Array<string> {
    // An array of images, that should replace canvas elements
    const replacementImages = [];

    // Walk through the original nodes looking for canvas elements
    // and generate images of these. These will then be used to replace
    // canvas elements within the cloned element that we walk through
    const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT, (node: HTMLElement) => {
        if (node.nodeName === "CANVAS") {
            // We don't want to include our virtual canvas
            // used for interaction events
            if (node.className === "virtual-canvas") {
                return NodeFilter.FILTER_REJECT;
            }

            return NodeFilter.FILTER_ACCEPT;
        }

        if (node.nodeName === "foreignObject") {
            return NodeFilter.FILTER_SKIP;
        }

        return NodeFilter.FILTER_REJECT;
    });

    while (walker.nextNode()) {
        const currentNode = walker.currentNode as HTMLElement;
        if (currentNode.nodeName === "CANVAS") {
            const imageData = (currentNode as HTMLCanvasElement).toDataURL("image/png");
            replacementImages.push(imageData);
        }
    }

    return replacementImages;
}

/**
 * Replace canvas elements with images
 * @param {HTMLElement} svg The SVG node
 * @param {Array<string>} replacementImages An array of the pre-generated images to replace the node with
 */
export function replaceCanvases(svg: HTMLElement, replacementImages: Array<string>) {
    let replaced = true;

    while (replaced) {
        replaced = false;

        // Create a walker that only considers the elements that we care about
        // Due to the fact that the walker stops when replacing a Node we need
        // to run this several times for each canvas we need to replace
        const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT, (node: HTMLElement) => {
            if (node.nodeName === "CANVAS") {
                // We don't want to include our virtual canvas
                // used for interaction events
                if (node.className === "virtual-canvas") {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            }

            if (node.nodeName === "foreignObject") {
                return NodeFilter.FILTER_SKIP;
            }

            return NodeFilter.FILTER_REJECT;
        });

        while (walker.nextNode()) {
            const currentNode = walker.currentNode as HTMLElement;

            // If we've got a canvas, go grab the appropriate image element
            // as canvas isn't serializable and the clone'd canvases will be empty
            if (currentNode.nodeName === "CANVAS") {
                const imageData = replacementImages.shift();
                const imgElement = document.createElement("img");

                imgElement.src = imageData;
                currentNode.parentNode?.replaceChild(imgElement, currentNode);
                replaced = true;
            }
        }
    }
}

/**
 * Serialize an SVG so that we can export as an image
 * @param {Node} svg     The SVG node
 * @return {string} The string representation of the SVG
 */
export function serializeSVG(svg: HTMLElement) {
    const fragment = window.location.href + "#";

    // Generate an array of images from the original SVG
    const replacementImages = generateImages(svg);

    // Replace the canvases with images in a cloned SVG
    const clone = svg.cloneNode(true) as HTMLElement;
    replaceCanvases(clone, replacementImages);

    const cloneWalker = document.createTreeWalker(clone, NodeFilter.SHOW_ELEMENT, null);
    while (cloneWalker.nextNode()) {
        const currentNode = cloneWalker.currentNode as HTMLElement;
        for (const attr of currentNode.attributes) {
            if (attr.value.includes(fragment)) {
                attr.value = attr.value.replace(fragment, "#");
            }
        }
    }

    clone.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns", "http://www.w3.org/2000/svg");
    clone.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

    return new XMLSerializer().serializeToString(clone);
}

/**
 * Conver the image XML to a JPG or PNG
 * @param {HTMLImageElement} image  The temporary image element
 * @param {number}           width  The width of the chart
 * @param {number}           height The height of the chart
 * @param {ITheme}           theme  The theme being used by the chart
 * @param {"PNG" | "JPG"} format    The format of the export
 * @param {number} scale            The scale of the image
 * @return {string | undefined} The PNG representation of the image as a string
 */
export function convertXMLToImage(
    image: HTMLImageElement,
    width: number,
    height: number,
    theme: ITheme,
    format: "PNG" | "JPG",
    scale: number,
) {
    const canvas = document.createElement("canvas");
    canvas.parentNode;

    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    const context = canvas.getContext("2d");
    if (context) {
        context.fillStyle = theme.background.toString();
        context.fillRect(0, 0, scaledWidth, scaledHeight);
        context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

        // Generate the PNG image data
        if (format === "JPG") return canvas.toDataURL("image/jpeg", 1.0);
        else return canvas.toDataURL("image/png");
    }
}

/**
 * Saves the given node as a PNG or JPG
 * @param {HTMLElement} svgNode     The SVG node to save
 * @param {ITheme} theme            The current theme of the chart
 * @param {number} width            The width of the chart
 * @param {number} height           The height of the height
 * @param {"PNG" | "JPG"} format    The format of the export
 * @param {number} scale            The scale of the image
 * @return {string}                 The PNG data in string format
 */
export async function exportImage(
    svgNode: HTMLElement,
    theme: ITheme,
    width: number,
    height: number,
    format: "PNG" | "JPG",
    scale: number,
) {
    return new Promise<string>((resolve, reject) => {
        const image = new Image();

        image.onload = () => {
            const imageData = convertXMLToImage(image, width, height, theme, format, scale);
            if (imageData) {
                resolve(imageData);
            } else {
                reject("Empty image generated");
            }
        };

        const url = "data:image/svg+xml; charset=utf8, " + encodeURIComponent(serializeSVG(svgNode));
        image.src = url;
    });
}
