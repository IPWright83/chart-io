import { generateImages, replaceCanvases } from "./exportImage";

describe("exportImage", () => {
    describe("generateImages", () => {
        it("generates an array of images from SVG", () => {
            // Create a mock SVG node containing canvas elements
            const svgNode = document.createElement("div");
            const canvas1 = document.createElement("canvas");
            const canvas2 = document.createElement("canvas");
            svgNode.appendChild(canvas1);
            svgNode.appendChild(canvas2);

            const images = generateImages(svgNode);

            expect(images).toHaveLength(2);
        });
    });

    describe("replaceCanvases", () => {
        it("replaces canvas elements with images", () => {
            // Create a mock SVG node containing canvas elements
            const svgNode = document.createElement("div");
            const canvas1 = document.createElement("canvas");
            const canvas2 = document.createElement("canvas");
            svgNode.appendChild(canvas1);
            svgNode.appendChild(canvas2);

            // Create mock replacement images
            const replacementImages = ["image1", "image2"];

            replaceCanvases(svgNode, replacementImages);

            // Validate that canvas elements have been replaced with img elements
            const imgElements = svgNode.querySelectorAll("img");
            expect(imgElements).toHaveLength(2);
        });
    });
});
