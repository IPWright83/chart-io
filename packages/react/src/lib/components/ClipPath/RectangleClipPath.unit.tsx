import React from "react";

import { renderChart, wait } from "../../testUtils";

import { RectangleClipPath } from "./RectangleClipPath";

describe("RectangleClipPath", () => {
    const Circle = ({ clipPath }: { clipPath?: string }) => {
        return <circle clipPath={`url(#${clipPath})`} cx={0} cy={0} r={100} fill="red" />;
    };

    it("renders correctly", async () => {
        const { asFragment } = await renderChart({
            children: (
                <RectangleClipPath>
                    <Circle />
                </RectangleClipPath>
            ),
        });

        await wait(10);

        expect(asFragment()).toMatchSnapshot();
    });
});
