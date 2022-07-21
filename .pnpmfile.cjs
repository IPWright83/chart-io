function readPackage(pkg) {
    if (pkg.name === "react-inspector") {
        pkg.dependencies["react"] = "18.2.0";
    }

    if (pkg.name === "@mdx-js/react") {
        pkg.dependencies["react"] = "18.2.0";
    }

    if (pkg.name === "react-element-to-jsx-string") {
        pkg.dependencies["react"] = "18.2.0";
        pkg.dependencies["react-dom"] = "18.2.0";
    }

    return pkg;
}

module.exports = {
    hooks: {
        readPackage,
    }
}
