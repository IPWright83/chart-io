const plotMargin = { left: 70, top: 40, right: 40, bottom: 40 };

const commonDefaultArgs = {
    width: 500,
    height: 300,
    useCanvas: false,
    animationDuration: 500,
    plotMargin,
    onClick: console.debug,
    onMouseOver: console.debug,
    onMouseOut: console.debug,
    theme: "light",
};

export { commonDefaultArgs };
