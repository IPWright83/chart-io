/**
 * Save the current window to an image
 * @param {String} url          The URL to save
 * @param {String} filename     The name of the file to save to
 */
export function downloadFile(url, filename) {
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
