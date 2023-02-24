/**
 * Returns the image buffer for a Canvas
 * @param canvas    The HTML canvas that we're going to extract the buffer from
 * @returns         The image buffer
 */
export function getBuffer(canvas: HTMLCanvasElement) {
    const image = canvas.toDataURL("image/png");
    const data = image.replace(/^data:image\/\w+;base64,/, "");
    // eslint-disable-next-line no-undef
    return Buffer.from(data, "base64");
}
