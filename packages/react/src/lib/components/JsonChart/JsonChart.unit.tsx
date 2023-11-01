import React from "react";
import { render } from "@testing-library/react";

import { sales_records_dataset } from "../../../data/sales_records_dataset";

import { wait } from "../../testUtils";

import { JsonChart } from "./JsonChart";

describe("JsonChart", () => {
    it("should create empty template correctly", async () => {
        const { asFragment } = render(
            <JsonChart
                data={sales_records_dataset}
                config={{
                    chart: {
                        id: "0000",
                        width: 800,
                        animationDuration: 0,
                    },
                    axis: {
                        x: {
                            fields: "Order Date",
                        },
                    },
                    series: {
                        scatters: {
                            ys: ["Total Cost", "Total Profit"],
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
