# Higher Order Components [internal]

This library has a number of custom React Higher Order Components that are used for convenience. They are documented here to aid understanding of the codebase, however understanding these is not required to simply use the package.

## `withCanvas` HoC

This HoC is designed to be the canvas equivalent of the `withSVG` HoC. It's purpose is to create an HTML5 canvas (embedded within the SVG using a `foreignObject`) and maintain it's dimensions to match the chart. It creates a "virtual" node that doesn't actually reside in the DOM but can be used for D3 data join purposes. These node gets passed to the wrapped component through the use of the `layer` prop.

> **Note:** While the virtual node can be used for the purposes of data joining and the D3 enter, exit, update pattern it should be noted that this doesn't add any visual components at all. Instead the [`renderCanvas`](renderCanvas.md) function should be used.

## `withStore` HoC

This HoC is designed to initialise a Redux store upon the creation of a visualization. It wraps the entire visualization with a Redux `<Provider>` which provides access to the store.

It is also responsible for registering any custom reducers, and triggering the `onStoreCreated` callback. These however are intercepted from the props passed to the visualization being wrapped. See **Extensibility** for more information.

## `withSVG` HoC

This HoC is designed to wrap an existing component with an SVG `<g>` element. This `<g>` is then passed to the wrapped component through the use of the `layer` prop. It is this layer that is used for all D3 data joins and rendering the elements onto. This is all internal and should not need to be modified. It's counterpart is the `withCanvas` HoC.

## `withXYPlot` HoC

This HoC is designed as an optimisation. Many plots require both an `xScale` and a `yScale` to render, however during the setup of a chart these are unavailable. This HoC accesses the Redux store to check for the presence of apprioriate scales, and if they are unavailable it surpresses rendering the child component while logging this information to the debug console.
