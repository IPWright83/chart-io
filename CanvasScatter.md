title CanvasScatter Example

VirtualCanvas->VirtualCanvas: Added to DOM
VirtualCanvas->ScatterBase: renderVirtualCanvas prop injected
ScatterBase->withXYPlot: wrapped in
withXYPlot->withCanvas: wrapped in
withCanvas->withCanvas: Render canvas within svg:foreignObject
withCanvas->withCanvas: Create fake DOM node
withCanvas->ScatterBase: pass { canvas: ref, layer: fakeDomNode }
ScatterBase->ScatterBase: Data Join & Render within useEffect
ScatterBase->renderCanvas: (canvas, renderVirtual, events)
renderCanvas->VirtualCanvas: renderVirtual(d3.selection, events)
