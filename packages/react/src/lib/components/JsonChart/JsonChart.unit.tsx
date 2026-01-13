import React from "react";
import { render } from "@testing-library/react";

import { sales_records_dataset } from "../../../data/sales_records_dataset";

import { wait } from "../../testUtils";

import { JsonChart } from "./JsonChart";

describe("JsonChart", () => {
    it("should create empty template correctly", async () => {
        const data = [
            { x: 0, y: 10, y2: 0 },
            { x: 5, y: 5, y2: 5 },
            { x: 10, y: 0, y2: 10 },
        ];

        const { asFragment } = render(
            <JsonChart
                data={data}
                config={{
                    chart: {
                        id: "0000",
                        width: 800,
                        animationDuration: 0,
                    },
                    axis: {
                        x: {
                            fields: "x",
                        },
                    },
                    series: {
                        scatters: {
                            ys: ["y", "y2"],
                            radius: 10,
                        },
                    },
                }}
            />,
        );

        await wait(10);

        expect(asFragment()).toMatchSnapshot();
    });
});
