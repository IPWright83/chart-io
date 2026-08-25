import{j as e}from"./jsx-runtime-BjG_zV1W.js";import{useMDXComponents as i}from"./index-D-2zTmTn.js";import{M as r,C as d}from"./index-3it-_4RI.js";import{Background as o,DisabledItem as c,CustomTheme as l}from"./ContextMenu.stories-BZSK-DPm.js";import{OnChartBackground as h,OnADataPoint as a}from"./ContextMenuOverlay.stories-DGwdvXi-.js";import"./index-DpTt3J-R.js";import"./iframe-BCCGJMhD.js";import"./index-D5nvoAmD.js";import"./index-B77L4dcM.js";import"./index-DrFu-skq.js";import"./index.es-DoiyW41S.js";import"./index-CFMwmiIJ.js";import"./ContextMenu-Dkh4zLYP.js";import"./react-redux-lkBMRsz6.js";import"./renderChart-DJ6bXfoi.js";import"./test-utils-C-DEfvFY.js";import"./client-CbGTh6y2.js";import"./index-CBSNT1TE.js";import"./index-VyfXoxD0.js";import"./index-5Gl1ki1p.js";import"./index-DzcEfe_2.js";import"./calculateScale-CBIGWBP9.js";import"./index-DVqBs4fh.js";import"./XAxis-CgOaLwq3.js";import"./index-C8nU8Xpn.js";import"./YAxis-CRYvaCDj.js";import"./index-DC1bvwxr.js";import"./index-B6be1P4a.js";import"./Bars-gIikB3lP.js";import"./renderCanvas-DSAxZURY.js";import"./index-DMa6aJSy.js";import"./index-Gn9jQ5lq.js";import"./lodash-DOJiQ2Wu.js";import"./index-CaWU7ljP.js";import"./index-HNMvlCFe.js";import"./index-DVRV05yR.js";import"./index-CsGapHqM.js";import"./index-CFwzIhDn.js";import"./Legend-DQjp6Mmo.js";import"./index-Bp2RIjag.js";import"./index-BmYvQTbQ.js";import"./Circle-Qf3Tu8hN.js";import"./Line-BjKan0E4.js";import"./Square-CZVurtTs.js";import"./index-BkBTUWQV.js";import"./index-CCgpevYr.js";import"./index-DVli7D7_.js";import"./Tooltip-aFreqMLS.js";import"./index-iwe53Xj-.js";import"./TooltipItem-D41oQ2An.js";import"./index-Dn87vz0y.js";function s(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Components/ContextMenu"}),`
`,e.jsx(n.h1,{id:"contextmenu-component",children:"ContextMenu Component"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<ContextMenu>"}),` component is a radial (pie-style) context menu - a ring of segments arranged
around a center point, each showing an icon and dispatching an action when clicked. It's pluggable:
every icon, label and click handler is provided by the caller, so the same component can show a
completely different set of actions depending on what it was opened on.`]}),`
`,e.jsx(d,{of:o}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"<ContextMenu>"}),` itself is a small, controlled component - it doesn't know how it was triggered, or
what it's connected to. It's a thin React wrapper around `,e.jsx(n.code,{children:"renderContextMenu"}),`, a framework-agnostic
D3 module exported from `,e.jsx(n.code,{children:"@chart-io/core"}),` that owns the actual rendering/animation/interaction, so
the same implementation can back a rendering layer for any framework (e.g. `,e.jsx(n.code,{children:"@chart-io/svelte"}),` could
call `,e.jsx(n.code,{children:"renderContextMenu"})," directly) rather than being reimplemented per-framework."]}),`
`,e.jsxs(n.p,{children:["It's rendered via a portal straight into ",e.jsx(n.code,{children:"document.body"}),", positioned with ",e.jsx(n.code,{children:"position: fixed"}),` at
`,e.jsx(n.code,{children:"(x, y)"})," - so it isn't clipped by a chart's own bounds/",e.jsx(n.code,{children:"overflow"}),", and ",e.jsx(n.code,{children:"x"}),"/",e.jsx(n.code,{children:"y"}),` can be a plain
`,e.jsx(n.code,{children:"MouseEvent"}),"'s ",e.jsx(n.code,{children:"clientX"}),"/",e.jsx(n.code,{children:"clientY"})," directly, with no coordinate-space conversion needed:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<ContextMenu
    x={120}
    y={80}
    open={isOpen}
    items={items}
    onSelect={(item) => {
        item.onSelect(dispatch, context);
        close();
    }}
    onClose={close}
/>
`})}),`
`,e.jsxs(n.p,{children:[`Its open/closed state, position and context (e.g. which datum it was opened on) live under
`,e.jsx(n.code,{children:"eventSelectors.contextMenu"}),` in the Redux store - the same convention the mouse position/tooltip/
droplines/markers already use - opened and closed via `,e.jsx(n.code,{children:"eventActions.openContextMenu"}),`/
`,e.jsx(n.code,{children:"closeContextMenu"}),". ",e.jsx(n.code,{children:"<ContextMenuOverlay>"}),` does exactly this, and is the version to reach for first;
see below for wiring up a menu on a specific datum the same way.`]}),`
`,e.jsxs(n.h3,{id:"contextmenu-props",children:[e.jsx(n.code,{children:"<ContextMenu>"})," Props"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"x"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{}),e.jsx(n.td,{children:"The x-coordinate (viewport/client space) to center the menu at"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"y"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{}),e.jsx(n.td,{children:"The y-coordinate (viewport/client space) to center the menu at"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"open"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{}),e.jsx(n.td,{children:"Whether the menu should be shown. Segments animate in/out as this changes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"items"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"IContextMenuItem[]"})}),e.jsx(n.td,{}),e.jsx(n.td,{children:"The pluggable set of actions to show as segments, clockwise starting just past the bottom gap"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"radius"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:"18.9"}),e.jsx(n.td,{children:"The inner radius of the ring, in pixels"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"thickness"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:"31.05"}),e.jsx(n.td,{children:"The depth of each segment, in pixels"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"padAngle"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:"0.025"}),e.jsx(n.td,{children:"The angular gap, in radians, between segments"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"gapAngle"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"Math.PI / 4"})}),e.jsx(n.td,{children:"The angular gap, in radians, left at the bottom (6 o'clock) - a thumb-sized notch"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"iconSize"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:"18"}),e.jsx(n.td,{children:"The size, in pixels, each item's icon is scaled to"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"animationDuration"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{children:"220"}),e.jsx(n.td,{children:"How long, in milliseconds, the show/hide animation takes"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"colors"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:'ITheme["menu"]'})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"themes.light.menu"})}),e.jsx(n.td,{children:"The color palette to render the menu with"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"onSelect"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"(item: IContextMenuItem) => void"})}),e.jsx(n.td,{}),e.jsx(n.td,{children:"Called when an enabled item is clicked"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"onClose"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"() => void"})}),e.jsx(n.td,{}),e.jsx(n.td,{children:"Called when the menu should close without a selection - Escape, or clicking outside it"})]})]})]}),`
`,e.jsxs(n.h3,{id:"icontextmenuitem-schema",children:[e.jsx(n.code,{children:"IContextMenuItem"})," Schema"]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"IContextMenuItem"}),` (along with the action factories and icon set below) is exported from
`,e.jsx(n.code,{children:"@chart-io/core"}),", not ",e.jsx(n.code,{children:"@chart-io/react"})," - it's framework-agnostic, used by ",e.jsx(n.code,{children:"renderContextMenu"}),`
directly.`]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"id"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"A unique identifier"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"label"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsx(n.td,{children:"Shown in a tooltip on hover, and used for accessibility"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"icon"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"string"})}),e.jsxs(n.td,{children:["Raw SVG markup (e.g. ",e.jsx(n.code,{children:'<path d="..."/>'}),"), sized automatically to fit. See ",e.jsx(n.code,{children:"contextMenuIcons"})," for a ready-made set"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"disabled"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"boolean"})}),e.jsx(n.td,{children:"Renders the segment disabled rather than removing it, so the ring doesn't reflow"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsxs(n.strong,{children:[e.jsx(n.code,{children:"onSelect"}),"*"]})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"(dispatch: IDispatch, context?: IContextMenuContext) => void"})}),e.jsx(n.td,{children:"Called when this item is selected"})]})]})]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h2,{id:"disabled-items",children:"Disabled Items"}),`
`,e.jsxs(n.p,{children:[`Rather than removing an item that isn't currently applicable (which would reflow the rest of the
ring), mark it `,e.jsx(n.code,{children:"disabled"})," - it's still shown, greyed out, and can't be clicked."]}),`
`,e.jsx(d,{of:c}),`
`,e.jsx(n.h2,{id:"theming",children:"Theming"}),`
`,e.jsxs(n.p,{children:["Pass ",e.jsx(n.code,{children:"colors"})," to use a different palette to the default. Charts connected via ",e.jsx(n.code,{children:"<ContextMenuOverlay>"}),`
automatically use the chart's own theme (`,e.jsx(n.code,{children:"theme.menu"}),") instead."]}),`
`,e.jsx(d,{of:l}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h1,{id:"contextmenuoverlay-component",children:"ContextMenuOverlay Component"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"<ContextMenuOverlay>"})," wires a ",e.jsx(n.code,{children:"<ContextMenu>"}),` up to a chart: right-clicking its background - not a
plot mark, an axis brush, or any other interactive element sitting on top of it - opens the menu
(suppressing the browser's native context menu for just that click), themed to match the chart, and
dispatches whichever action is selected into the Redux store. `,e.jsx(n.code,{children:"<XYChart>"}),"/",e.jsx(n.code,{children:"<RadialChart>"}),` already
enable it by default (see their `,e.jsx(n.code,{children:"contextMenu"})," prop) - you don't normally need to add it yourself:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<XYChart data={data}>
    <YAxis fields={["category"]} scaleType="band" />
    <XAxis fields={["value"]} />
    <Bar x="value" y="category" />
</XYChart>
`})}),`
`,e.jsx(d,{of:h}),`
`,e.jsxs(n.p,{children:["Pass ",e.jsx(n.code,{children:"contextMenu={false}"}),` to turn it off - e.g. if you want to configure it yourself with a custom
`,e.jsx(n.code,{children:"getItems"}),", by adding your own ",e.jsx(n.code,{children:"<ContextMenuOverlay>"})," as a child instead:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`<XYChart data={data} contextMenu={false}>
    <Bar x="value" y="category" />
    <ContextMenuOverlay getItems={(state) => [createResetZoomAction(state)]} />
</XYChart>
`})}),`
`,e.jsxs(n.p,{children:["By default it shows five stubbed-out background actions - override ",e.jsx(n.code,{children:"getItems"}),` to add, remove or
replace any of them:`]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Action"}),e.jsx(n.th,{children:"Behaviour"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Reset zoom"})}),e.jsxs(n.td,{children:["Fully wired up - clears a zoomable plot's zoom path and any ",e.jsx(n.code,{children:"<ZoomBrush>"})," domain. Disabled while nothing is zoomed in"]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Reset filters"})}),e.jsxs(n.td,{children:["Fully wired up - clears any ",e.jsx(n.code,{children:"<ParallelCoordinates>"}),' axis brush and any datum hidden via "Hide data point" below. Disabled while neither is set']})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.strong,{children:"Hide legend"}),"/",e.jsx(n.strong,{children:"Show legend"})]}),e.jsxs(n.td,{children:["Fully wired up via ",e.jsx(n.code,{children:"chartActions.setLegendVisible"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Pivot"})}),e.jsx(n.td,{children:"A stub - there's no store concept of a heatmap pivot yet"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Draw polygon"})}),e.jsx(n.td,{children:"A stub - there's no interactive drawing mode yet"})]})]})]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { createResetZoomAction, createToggleLegendAction } from "@chart-io/core";

<ContextMenuOverlay getItems={(state) => [createResetZoomAction(state), createToggleLegendAction(state)]} />
`})}),`
`,e.jsxs(n.h3,{id:"contextmenuoverlay-props",children:[e.jsx(n.code,{children:"<ContextMenuOverlay>"})," Props"]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Prop"}),e.jsx(n.th,{children:"Type"}),e.jsx(n.th,{children:"Default"}),e.jsx(n.th,{children:"Note"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"getItems"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"(state: IState, context?: IContextMenuContext) => IContextMenuItem[]"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"getDefaultItems"})}),e.jsx(n.td,{children:"Builds the items to show, given the current Redux state and the context (background or datum) the menu was opened with"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"radius"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{}),e.jsxs(n.td,{children:["See ",e.jsx(n.code,{children:"<ContextMenu>"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"thickness"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{}),e.jsxs(n.td,{children:["See ",e.jsx(n.code,{children:"<ContextMenu>"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"padAngle"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{}),e.jsxs(n.td,{children:["See ",e.jsx(n.code,{children:"<ContextMenu>"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"iconSize"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{}),e.jsxs(n.td,{children:["See ",e.jsx(n.code,{children:"<ContextMenu>"})]})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"animationDuration"})}),e.jsx(n.td,{children:e.jsx(n.code,{children:"number"})}),e.jsx(n.td,{}),e.jsxs(n.td,{children:["See ",e.jsx(n.code,{children:"<ContextMenu>"})]})]})]})]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h2,{id:"menus-on-a-data-point",children:"Menus on a Data Point"}),`
`,e.jsxs(n.p,{children:["Left-clicking a mark on ",e.jsx(n.code,{children:"<Scatter>"}),", ",e.jsx(n.code,{children:"<Bar>"}),"/",e.jsx(n.code,{children:"<GroupedBar>"}),"/",e.jsx(n.code,{children:"<StackedBar>"}),", ",e.jsx(n.code,{children:"<Column>"}),`/
`,e.jsx(n.code,{children:"<GroupedColumn>"}),"/",e.jsx(n.code,{children:"<StackedColumn>"}),", ",e.jsx(n.code,{children:"<Pie>"}),"/",e.jsx(n.code,{children:"<Donut>"}),", ",e.jsx(n.code,{children:"<Line>"}),"/",e.jsx(n.code,{children:"<Area>"}),"/",e.jsx(n.code,{children:"<StackedArea>"}),", ",e.jsx(n.code,{children:"<Radar>"}),`,
`,e.jsx(n.code,{children:"<RadialArea>"}),", ",e.jsx(n.code,{children:"<Treemap>"}),", ",e.jsx(n.code,{children:"<CirclePacking>"}),", ",e.jsx(n.code,{children:"<WordCloud>"})," and ",e.jsx(n.code,{children:"<Funnel>"}),` already opens the same
`,e.jsx(n.code,{children:"<ContextMenuOverlay>"})," with ",e.jsx(n.code,{children:"getDefaultDatumItems"}),` - "Hide data point" (fully wired up, via
`,e.jsx(n.code,{children:"chartActions.hideDataPoint"}),`), and stubbed "Focus data point"/"Add annotation" - alongside whatever
that plot's own `,e.jsx(n.code,{children:"onClick"})," prop already does, nothing to set up. ",e.jsx(n.code,{children:"<ParallelCoordinates>"}),` is the one
built-in exception, since its own brush-based filtering already covers this. `,e.jsx(n.code,{children:"<XYChart>"}),`/
`,e.jsx(n.code,{children:"<RadialChart>"})," still need ",e.jsx(n.code,{children:"contextMenu"})," left at its default (",e.jsx(n.code,{children:"true"}),`) for this to show, the same as
the background menu. Right-clicking a mark is deliberately left alone (falling through to the
browser's native menu) - only the background gets a right-click menu.`]}),`
`,e.jsxs(n.p,{children:["For a custom plot without this built in, wire it up the same way those do: call ",e.jsx(n.code,{children:"useDatumContextMenu"}),`
and call the handler it returns from your mark's own `,e.jsx(n.code,{children:"click"})," handler:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import { useDatumContextMenu } from "@chart-io/react";

function MyPlot({ data }) {
    const onDatumContextMenu = useDatumContextMenu();

    // Inside your D3 join:
    // .on("click", (event, datum) => {
    //     onClick && onClick(datum, event.currentTarget, event);
    //     onDatumContextMenu(datum, event);
    // })
}
`})}),`
`,e.jsxs(n.p,{children:["That dispatches ",e.jsx(n.code,{children:"eventActions.openContextMenu"})," with a ",e.jsx(n.code,{children:'"datum"'}),` context for you. To build the menu by
hand instead - e.g. to show it somewhere other than `,e.jsx(n.code,{children:"<ContextMenuOverlay>"}),` - read
`,e.jsx(n.code,{children:"eventSelectors.contextMenu"}),` back with a small connected component the same way
`,e.jsx(n.code,{children:"<ContextMenuOverlay>"})," does:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`function DatumMenu() {
    const dispatch = useDispatch();
    const isOpen = useSelector((s) => eventSelectors.contextMenu.isOpen(s));
    const position = useSelector((s) => eventSelectors.contextMenu.position(s));
    const context = useSelector((s) => eventSelectors.contextMenu.context(s));
    const close = () => dispatch(eventActions.closeContextMenu());

    return (
        <ContextMenu
            x={position?.x ?? 0}
            y={position?.y ?? 0}
            open={isOpen}
            items={getDefaultDatumItems()}
            onSelect={(item) => {
                item.onSelect(dispatch, context);
                close();
            }}
            onClose={close}
        />
    );
}

// contextMenu={false} turns off the chart's own default <ContextMenuOverlay>, since <DatumMenu>
// above is standing in for it here
<XYChart data={data} contextMenu={false}>
    <MyPlot />
    <DatumMenu />
</XYChart>
`})}),`
`,e.jsx(d,{of:a}),`
`,e.jsxs(n.p,{children:['"Hide data point" is fully wired up, via ',e.jsx(n.code,{children:"chartActions.hideDataPoint"})," - see ",e.jsx(n.code,{children:"chartSelectors.data"}),`,
which every plot reads its rows through, so a hidden datum disappears from the chart entirely rather
than just fading like a `,e.jsx(n.code,{children:"<ParallelCoordinates>"}),` brush selection does. "Focus data point" and "Add
annotation" remain stubs - there's no store concept of a focused/annotated datum yet. Each logs to the
console describing what it would do - replace `,e.jsx(n.code,{children:"onSelect"}),` with a real dispatch once that store state
exists.`]})]})}function le(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{le as default};
//# sourceMappingURL=ContextMenu-DbFkN0tr.js.map
