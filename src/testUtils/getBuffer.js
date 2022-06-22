// import { toMatchImageSnapshot } from "jest-image-snapshot";

// expect.extend({ toMatchImageSnapshot });

export const getBuffer = (canvas) => {
    const image = canvas.toDataURL("image/png");
    const data = image.replace(/^data:image\/\w+;base64,/, "");
    // eslint-disable-next-line no-undef
    return Buffer.from(data, "base64");
};
