# renderCanvas [internal]

The `renderCanvas` function is a utility function provided to make working with Canvas easier for plots. The workflow for this function however is slightly involved so is documented for developers.

The first thing to note is that `renderCanvas` is safe to call from all Plots, regardless of whether they're rendering to SVG or Canvas. The first check is to see if a `canvas` parameter has been passed through to the function, and if not all work will be short-circuited. If however rendering is to take place there are 3 main steps:

1. Determine whether to progressively Render
2. Render to the Canvas
3. Optionally render to the Virtual Canvas

## Progressive Rendering

The progressive rendering contained within **progressiveCanvasRenderLoop.js** is designed to render the contents of the virtual node to an HTML canvas in a batched way. The aim is to handle very large datasets without causing performance degradation to the browser. It begins by clearing the canvas and then in batches of 1000 data points will render them on each avaliable animation frame. It uses the same rendering functionality as a normal render to canvas.

> **Note:** Progressive rendering kicks in when there are more than 10,000 data points by default. This isn't currently customisable. When this behaviour starts it's also worth noting that Canvas events are also disabled.

## Canvas Render Loop

Normal canvas rendering operates within a loop. The call to `renderCanvas` is provided with both the D3 `update` (this should already have been merged with an enter selection) and `exit` selections. The rendering loop to canvas will attempt to keep running until the `.end()` function on these selection resolves. **Note** that this assumes the selection is a transition selection. Error handling is in place for empty selections or non transition selections. Once any transitions complete, the canvas rendering loop stops.

During this loop a call to `renderElements` is made. This function itterates all the elements within the virtual node, and depending on their type will call a different render utility function such as `renderCircle` or `renderRect`. These helpers copy all the attributes of the virtual node and translate into rendering to the canvas context.

## Virtual Canvas Rendering

Finally once normal canvas rendering completes, a virtual canvas render occurs. This canvas is how we provide events such as `click`, `mouseenter` and `mouseexit` on data points. The rendering is a somewhat complex process as it is not possible to layer interactive canvas's so instead we make use of a single, shared canvas and need to ensure the rendering is orchestrated - as we woudln't want one plot to clear the canvas when another has already drawn to it.

### `<VirtualCanvas>` component

This component augments the props passed to most layers to include a `renderVirtualCanvas` function. This function has been debounced to try and prevent the aforementioned issue of layers interrupting each other. Everytime this function is called, the set of data points that need rendering are cached. Once each plot has attempted to call the `renderVirtualCanvas` an internal function to this component is called. It's job is to firstly clear the canvas, and secondly render all the nodes recording a special color->datum lookup table to support the eventing.

Underneath the rendering to the `<VirtualCanvas>` behaves in the same way as a single render from the Canvas render loop, with the 1 exception that each datapoint has a unique color assigned to it. This color is used to override the default styling of the `circle`, `rect` etc and is used to identify which point the mouse is hovering over when capturing mouse events.
