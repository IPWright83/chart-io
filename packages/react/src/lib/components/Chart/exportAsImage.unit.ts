import { downloadFile, exportImage } from "../../utils";
import { exportAsImage } from "./exportAsImage";
import { themes } from "../../themes";

jest.mock("../../utils", () => ({
  ...jest.requireActual("../../utils"),
  exportImage: jest.fn(),
  downloadFile: jest.fn(),
}));

describe("exportAsImage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("exports an image in PNG format with default parameters", async () => {
    const svgNode = document.createElement("div"); // Create a mock SVG node

    (exportImage as jest.Mock).mockResolvedValue("mockImageData");

    // Create a function to trigger the export
    const exportFunction = exportAsImage(svgNode, "light", 800, 600);

    // Call the export function with a filename
    const filename = "chart";
    const imageData = await exportFunction(filename);

    // Verify that the dependencies were called with the correct arguments
    expect(exportImage).toHaveBeenCalledWith(svgNode, themes.light, 800, 600, "PNG", 1);
    expect(downloadFile).toHaveBeenCalledWith(imageData, "chart.png");

    // Verify that the function returned the expected image data
    expect(imageData).toEqual("mockImageData");
  });
});
