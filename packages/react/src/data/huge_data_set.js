let huge_data_set = [];

for (let i = 0; i < 20000; i++) {
    huge_data_set.push({
        "Units Sold": Math.random() * 10000,
        "Total Profit": Math.random() * 1600000,
    });
}

export { huge_data_set };
