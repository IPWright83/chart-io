// import { toMatchImageSnapshot } from "jest-image-snapshot";

// expect.extend({ toMatchImageSnapshot });

// *
//  * Ensure a canvas matches the given snapshot
//  * @param  {HTMLElement} canvas         The canvas object

export const getBuffer = (canvas) => {
    const image = canvas.toDataURL("image/png");
    const data = image.replace(/^data:image\/\w+;base64,/, "");
    return Buffer.from(data, "base64");
};
