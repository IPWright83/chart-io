import { Provider, useSelector } from "react-redux";
import React from "react";

import { chartSelectors, IState } from "../../store";
import { createMockStore, renderChart, wait } from "../../testUtils";
import { themes } from "../../themes";

import { RectangleClipPath } from "./RectangleClipPath";

describe("RectangleClipPath", () => {
    const store = createMockStore({
        chart: {
            dimensions: {
                width: 800,
                height: 400,
            },
            theme: themes.light,
        },
        event: {
            mouse: { x: 150, y: 200 },
        },
    });

    const Circle = () => {
        const plotClipPath = useSelector((s: IState) => chartSelectors.plotClipPath(s));

        return <circle clipPath={`url(#${plotClipPath})`} cx={0} cy={0} r={100} fill="red" />;
    };

    it("renders correctly", async () => {
        const { asFragment } = await renderChart({
            children: (
                <Provider store={store}>
                    <RectangleClipPath />
                    <Circle />
                </Provider>
            ),
        });

        await wait(10);

        expect(asFragment()).toMatchSnapshot();
    });
});
