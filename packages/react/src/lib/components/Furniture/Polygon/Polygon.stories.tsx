import React from "react";

import { Polygon } from ".";

export default {
    title: "Components/Polygon",
    component: Polygon,
    parameters: {
        chromatic: { delay: 300 },
    },
};

const PolygonTemplate = () => {
    return (
        <svg>
            <Polygon fill="steelblue" stroke="red" opacity={0.5} points={"0,100 50,25 50,75 100,0"} />
        </svg>
    );
};

export const Default = {
    name: "Polygon",
    render: PolygonTemplate,
};
