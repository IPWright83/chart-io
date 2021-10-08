const seriesArgTypes = {
    description: "The field to use for the axis",
    defaultValue: { summary: "undefined" },
    options: [
        "Region",
        "Country",
        "Item Type",
        "Sales Channel",
        "Order Priority",
        "Order Date",
        "Order ID",
        "Ship Date",
        "Units Sold",
        "Unit Price",
        "Unit Cost",
        "Total Revenue",
        "Total Cost",
        "Total Profit",
    ],
    control: { type: "select" },
};

export { seriesArgTypes };
