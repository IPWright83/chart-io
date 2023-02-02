/**
 * Returns the image buffer for a Canvas
 */
export function getBuffer(canvas: HTMLCanvasElement) {
    const image = canvas.toDataURL("image/png");
    const data = image.replace(/^data:image\/\w+;base64,/, "");
    // eslint-disable-next-line no-undef
    return Buffer.from(data, "base64");
}
