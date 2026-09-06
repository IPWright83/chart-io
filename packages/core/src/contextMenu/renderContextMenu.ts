import { d3 } from "../d3";
import type { IContextMenuItem, ITheme } from "../types";

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * A minimal linear interpolator between two numbers, since `d3-interpolate` isn't part of the `d3`
 * barrel this package re-exports
 * @param  a    The value at `t = 0`
 * @param  b    The value at `t = 1`
 * @return      A function returning the interpolated value for a given `t` (0-1)
 */
function interpolateNumber(a: number, b: number): (t: number) => number {
    return (t: number) => a + (b - a) * t;
}

export interface IContextMenuOptions {
    /**
     * The x-coordinate (viewport/client space, e.g. `MouseEvent.clientX`) to center the menu at
     */
    x: number;
    /**
     * The y-coordinate (viewport/client space, e.g. `MouseEvent.clientY`) to center the menu at
     */
    y: number;
    /**
     * Whether the menu should be shown. Segments grow out from the center when this becomes `true`,
     * and shrink back in when it becomes `false`
     */
    open: boolean;
    /** The pluggable set of actions to show as segments, clockwise starting just past the bottom gap */
    items: IContextMenuItem[];
    /**
     * The inner radius of the ring, in pixels
     * @default 18.9
     */
    radius?: number;
    /**
     * The depth of each segment, in pixels
     * @default 31.05
     */
    thickness?: number;
    /**
     * The angular gap, in radians, to leave between each segment
     * @default 0.025
     */
    padAngle?: number;
    /**
     * The angular gap, in radians, to leave at the bottom of the ring, centered on 6 o'clock - a
     * small notch/cutout so there's somewhere to rest a thumb without covering a segment, rather
     * than items filling the full circle
     * @default Math.PI / 4 (45deg)
     */
    gapAngle?: number;
    /**
     * The size, in pixels, that each item's icon is scaled to
     * @default 18
     */
    iconSize?: number;
    /**
     * How long, in milliseconds, the show/hide animation takes
     * @default 220
     */
    animationDuration?: number;
    /** The color palette to render the menu with */
    colors?: ITheme["menu"];
    /**
     * Called when an (enabled) item is clicked
     * @param  item     The item that was selected
     */
    onSelect: (item: IContextMenuItem) => void;
    /**
     * Called when the menu should close without an item being selected - clicking outside the
     * menu, or pressing Escape
     */
    onClose?: () => void;
}

interface IContextMenuInstance {
    mounted: boolean;
    radius: number;
    thickness: number;
    cleanupWindowListeners?: () => void;
}

const instances = new WeakMap<HTMLElement, IContextMenuInstance>();

const DEFAULT_COLORS: ITheme["menu"] = {
    background: "#4679bd",
    backgroundHover: "#6b95cf",
    backgroundDisabled: "#a0aec0",
    text: "#ffffff",
    border: "#ffffff",
};

type IArc = d3.PieArcDatum<IContextMenuItem>;
type ID3RootSelection = d3.Selection<SVGSVGElement, unknown, null, undefined>;

/**
 * Builds the pie layout used to lay out segments - `d3.pie`'s defaults sweep the full circle
 * starting at 12 o'clock; this leaves `gapAngle` radians open at the bottom (centered on 6 o'clock)
 * instead, so the ring reads as a "C" with a thumb-sized notch rather than a full ring
 * @param  padAngle    The angular gap, in radians, to leave between each segment
 * @param  gapAngle    The angular gap, in radians, to leave at the bottom of the ring
 * @return             A configured `d3.pie` layout
 */
export function createPieLayout(padAngle: number, gapAngle: number) {
    const startAngle = Math.PI + gapAngle / 2;

    return d3
        .pie<IContextMenuItem>()
        .value(() => 1)
        .padAngle(padAngle)
        .sort(null)
        .startAngle(startAngle)
        .endAngle(startAngle + (2 * Math.PI - gapAngle));
}

/**
 * Gets (or lazily creates) the `<svg>` this menu draws into, sized to fit the ring and centered on
 * its own origin - so the arc geometry below can stay in simple (0, 0)-centered coordinates, with
 * `container`'s own position (set by the caller of `renderContextMenu`) doing the actual placement
 * @param  container    The menu's root HTML element, e.g. a `<div>` positioned via CSS
 * @param  size         The full width/height, in pixels, the ring needs to fit within
 * @return              A selection wrapping the `<svg>`
 */
function ensureSvg(container: HTMLElement, size: number): ID3RootSelection {
    let svg = container.querySelector<SVGSVGElement>(":scope > svg");

    if (!svg) {
        svg = document.createElementNS(SVG_NS, "svg") as SVGSVGElement;
        container.appendChild(svg);
    }

    const half = size / 2;
    svg.setAttribute("width", String(size));
    svg.setAttribute("height", String(size));
    svg.setAttribute("viewBox", `${-half} ${-half} ${size} ${size}`);

    return d3.select(svg);
}

/**
 * Attaches (once per open session) the Escape/click-outside listeners that close the menu
 * @param  container    The menu's root element - clicks inside it don't count as "outside"
 * @param  instance     This container's tracked instance state, used to avoid attaching twice
 * @param  onClose      Called when Escape is pressed, or a click/tap lands outside `container`
 */
function attachCloseListeners(container: HTMLElement, instance: IContextMenuInstance, onClose?: () => void) {
    if (instance.cleanupWindowListeners) {
        return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onClose?.();
        }
    };

    const onPointerDown = (event: PointerEvent) => {
        if (!container.contains(event.target as Node)) {
            onClose?.();
        }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);

    instance.cleanupWindowListeners = () => {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("pointerdown", onPointerDown);
    };
}

/** The gap, in pixels, left between the main ring and a hovered item's outer "active" band */
const ACTIVE_BAND_GAP = 3;

/** The depth, in pixels, of a hovered item's outer "active" band */
const ACTIVE_BAND_THICKNESS = 10;

/**
 * Builds the `d` path string for each of `count` equal-width mini arcs spanning `[startAngle,
 * endAngle]` at `[innerRadius, outerRadius]`, with a small gap between them - the outer "active"
 * band revealed on a hovered segment (see `IContextMenuItem.activeSegments`)
 * @param  startAngle    The angular start (radians) of the segment this band sits over
 * @param  endAngle      The angular end (radians) of the segment this band sits over
 * @param  innerRadius   The band's inner radius, in pixels
 * @param  outerRadius   The band's outer radius, in pixels
 * @param  count         How many equal mini arcs to split the band into
 * @return               One `d` path string per mini arc
 */
function activeSegmentPaths(startAngle: number, endAngle: number, innerRadius: number, outerRadius: number, count: number): string[] {
    const miniGapAngle = 0.02;
    const each = (endAngle - startAngle - miniGapAngle * (count - 1)) / count;

    return Array.from({ length: count }, (_, i) => {
        const segStart = startAngle + i * (each + miniGapAngle);

        return d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(1)
            .startAngle(segStart)
            .endAngle(segStart + each)(undefined);
    });
}

/**
 * Toggles a hovered item's outer "active" band on/off, via the CSS `transition` set on the group
 * when it's first created. Hovering an item with no `activeSegments` is a harmless no-op, since its
 * (empty) band group has nothing to fade in
 * @param  item     The `<g class="chart-io context-menu-item">` selection for one segment
 * @param  shown    Whether the band should be shown
 */
function setActiveSegmentsShown(item: d3.Selection<SVGGElement, unknown, null, undefined>, shown: boolean): void {
    item.select(".chart-io.context-menu-active-segments").style("opacity", shown ? 1 : 0);
}

/**
 * Writes each item's icon markup (from `d.data.icon`) into `selection`'s `<g>`, and tints it via the
 * menu's `colors.text`. Only touches the DOM when the icon has actually changed, keyed by item id -
 * without this, re-selecting an already-rendered menu (e.g. `updateInPlace`) would rewrite identical
 * markup on every call
 * @param  selection    A `.chart-io.context-menu-icon` group selection
 * @param  colors       The menu's color palette, applied as the icon's `currentColor`
 */
function setIconContent(selection: d3.Selection<SVGGElement, IArc, any, unknown>, colors: ITheme["menu"]): void {
    selection.style("color", colors.text?.toString() ?? null).each(function (d) {
        const node = d3.select(this);
        if (node.attr("data-icon") !== d.data.id) {
            node.attr("data-icon", d.data.id).html(d.data.icon);
        }
    });
}

/**
 * Builds/updates each item's outer "active" band - the mini arcs revealed on hover (see
 * `IContextMenuItem.activeSegments`) - from its current angular position and `activeSegments` count.
 * Safe to call on both a freshly-entered and an already-rendered selection: re-running it just
 * reconciles the child `<path>`s (via `.join`) to whatever `activeSegments` currently resolves to
 * @param  selection    A `.chart-io.context-menu-active-segments` group selection
 * @param  radius       The ring's inner radius, in pixels
 * @param  thickness    The ring's segment depth, in pixels
 * @param  colors       The menu's color palette, applied as the band's fill/stroke
 */
function renderActiveSegments(
    selection: d3.Selection<SVGGElement, IArc, any, unknown>,
    radius: number,
    thickness: number,
    colors: ITheme["menu"],
): void {
    selection.each(function (d) {
        const count = d.data.activeSegments ?? 0;
        const paths = count
            ? activeSegmentPaths(d.startAngle, d.endAngle, radius + thickness + ACTIVE_BAND_GAP, radius + thickness + ACTIVE_BAND_GAP + ACTIVE_BAND_THICKNESS, count)
            : [];

        d3.select(this)
            .selectAll<SVGPathElement, string>("path")
            .data(paths)
            .join("path")
            .attr("d", (p) => p)
            .attr("fill", colors.background?.toString() ?? null)
            .attr("stroke", colors.border?.toString() ?? null)
            .attr("stroke-width", 1);
    });
}

/**
 * Renders the ring of segments for a freshly-opened menu, growing each segment's outer radius out
 * from the center
 * @param  root         A selection wrapping the menu's root `<svg>` element
 * @param  options      The menu's fully-resolved configuration
 */
function buildAndGrow(root: ID3RootSelection, options: Required<IContextMenuOptions>) {
    const { items, radius, thickness, padAngle, gapAngle, iconSize, animationDuration, colors, onSelect } = options;

    const pie = createPieLayout(padAngle, gapAngle);
    const arcs = pie(items);
    const arcGenerator = d3.arc<IArc>().innerRadius(radius).cornerRadius(3);

    const join = root
        .selectAll<SVGGElement, IArc>(".chart-io.context-menu-item")
        .data(arcs, (d) => d.data.id);

    join.exit().remove();

    const enter = join.enter().append("g").attr("class", "chart-io context-menu-item");
    enter.append("path");
    enter.append("g").attr("class", "chart-io context-menu-icon");
    enter
        .append("g")
        .attr("class", "chart-io context-menu-active-segments")
        .style("opacity", 0)
        .style("transition", "opacity 120ms ease-out")
        .style("pointer-events", "none");

    const merged = enter.merge(join).attr("data-disabled", (d) => String(!!d.data.disabled));

    const paths = merged
        .select<SVGPathElement>("path")
        .style("cursor", (d) => (d.data.disabled ? "default" : "pointer"))
        .style("transition", "fill 120ms ease-out")
        .style("fill", (d) => (d.data.disabled ? colors.backgroundDisabled : colors.background)?.toString() ?? null)
        .attr("stroke", colors.border?.toString() ?? null)
        .attr("stroke-width", 1)
        .on("mouseenter", function (_event, d) {
            if (d.data.disabled) return;
            d3.select(this).style("fill", colors.backgroundHover?.toString() ?? null);
            setActiveSegmentsShown(d3.select(this.parentNode as SVGGElement), !!d.data.activeSegments);
        })
        .on("mouseleave", function (_event, d) {
            if (d.data.disabled) return;
            d3.select(this).style("fill", colors.background?.toString() ?? null);
            setActiveSegmentsShown(d3.select(this.parentNode as SVGGElement), false);
        })
        .on("click", (_event, d) => {
            if (d.data.disabled) return;
            onSelect(d.data);
        });

    paths.selectAll("title").data((d) => [d]).join("title").text((d) => d.data.label);

    setIconContent(merged.select<SVGGElement>(".chart-io.context-menu-icon"), colors);
    renderActiveSegments(merged.select<SVGGElement>(".chart-io.context-menu-active-segments"), radius, thickness, colors);

    merged
        .select<SVGGElement>(".chart-io.context-menu-icon")
        .style("pointer-events", "none")
        .each(function () {
            d3.select(this).select("svg").attr("width", iconSize).attr("height", iconSize);
        })
        .attr("transform", (d) => {
            const [ix, iy] = arcGenerator.outerRadius(radius + thickness).centroid(d);
            return `translate(${ix - iconSize / 2}, ${iy - iconSize / 2})`;
        });

    paths
        .attr("d", (d) => arcGenerator.outerRadius(radius)(d))
        .transition()
        .duration(animationDuration)
        .ease(d3.easeBackOut.overshoot(1.3))
        .attrTween("d", (d) => {
            const interpolateOuterRadius = interpolateNumber(radius, radius + thickness);
            return (t: number) => arcGenerator.outerRadius(interpolateOuterRadius(t))(d);
        });

    merged
        .select(".chart-io.context-menu-icon")
        .style("opacity", 0)
        .transition()
        .delay(animationDuration * 0.4)
        .duration(animationDuration * 0.6)
        .style("opacity", 1);
}

/**
 * Updates an already-open menu in place, without re-running the grow transition (e.g. re-theming,
 * or a disabled item becoming enabled)
 * @param  root         A selection wrapping the menu's root `<svg>` element
 * @param  options      The menu's fully-resolved configuration
 */
function updateInPlace(root: ID3RootSelection, options: Required<IContextMenuOptions>) {
    const { items, radius, thickness, padAngle, gapAngle, iconSize, colors, onSelect } = options;

    const pie = createPieLayout(padAngle, gapAngle);
    const arcs = pie(items);
    const arcGenerator = d3.arc<IArc>().innerRadius(radius).outerRadius(radius + thickness).cornerRadius(3);

    const merged = root
        .selectAll<SVGGElement, IArc>(".chart-io.context-menu-item")
        .data(arcs, (d) => d.data.id)
        .attr("data-disabled", (d) => String(!!d.data.disabled));

    merged
        .select<SVGPathElement>("path")
        .attr("d", (d) => arcGenerator(d))
        .style("cursor", (d) => (d.data.disabled ? "default" : "pointer"))
        .style("fill", (d) => (d.data.disabled ? colors.backgroundDisabled : colors.background)?.toString() ?? null)
        .on("click", (_event, d) => {
            if (d.data.disabled) return;
            onSelect(d.data);
        });

    setIconContent(merged.select<SVGGElement>(".chart-io.context-menu-icon"), colors);
    renderActiveSegments(merged.select<SVGGElement>(".chart-io.context-menu-active-segments"), radius, thickness, colors);

    merged
        .select<SVGGElement>(".chart-io.context-menu-icon")
        .attr("transform", (d) => {
            const [ix, iy] = arcGenerator.centroid(d);
            return `translate(${ix - iconSize / 2}, ${iy - iconSize / 2})`;
        })
        .each(function () {
            d3.select(this).select("svg").attr("width", iconSize).attr("height", iconSize);
        });
}

/**
 * Shrinks every segment back down to the center, then removes them and detaches the close listeners
 * @param  root                 A selection wrapping the menu's root `<svg>` element
 * @param  instance             This container's tracked instance state
 * @param  animationDuration    How long, in milliseconds, the shrink transition takes
 */
function shrinkAndRemove(root: ID3RootSelection, instance: IContextMenuInstance, animationDuration: number) {
    instance.mounted = false;
    instance.cleanupWindowListeners?.();
    instance.cleanupWindowListeners = undefined;

    const { radius } = instance;
    const arcGenerator = d3.arc<IArc>().innerRadius(radius).cornerRadius(3);

    const items = root.selectAll<SVGGElement, IArc>(".chart-io.context-menu-item");

    items.select(".chart-io.context-menu-icon").transition().duration(animationDuration * 0.4).style("opacity", 0);

    items
        .select<SVGPathElement>("path")
        .transition()
        .duration(animationDuration)
        .attrTween("d", function (d) {
            const currentOuterRadius = radius + instance.thickness;
            const interpolateOuterRadius = interpolateNumber(currentOuterRadius, radius);
            return (t: number) => arcGenerator.outerRadius(interpolateOuterRadius(t))(d);
        })
        .on("end", function () {
            d3.select(this.parentNode as SVGGElement).remove();
        });
}

/**
 * Renders (or updates, or closes) a pluggable radial `<ContextMenu>` into the given HTML container -
 * a framework-agnostic D3 module, independent of any particular rendering framework, so the same
 * implementation can be shared across e.g. `@chart-io/react` and `@chart-io/svelte`.
 *
 * `container` is expected to be mounted directly under `document.body` (e.g. via a React portal) so
 * the menu isn't clipped by a chart's own `overflow`/bounds - this function positions it with
 * `position: fixed` at `(x, y)` itself, in viewport/client coordinates, so callers can pass a plain
 * `MouseEvent.clientX/clientY` straight through without any coordinate-space conversion
 *
 * Every icon, label and click handler comes from `options.items`, so the same module can show a
 * completely different set of actions depending on what it was opened on. Call this again whenever
 * `options` changes (e.g. from a `useEffect`/reactive statement) - it diffs against the container's
 * previous state rather than tearing everything down each time. Call `destroyContextMenu` once the
 * container itself is going away
 * @param  container    The HTML element to render into, e.g. a `<div>` portaled to `document.body`
 * @param  options      The menu's configuration
 */
export function renderContextMenu(container: HTMLElement, options: IContextMenuOptions): void {
    // Resolve field-by-field with `??` rather than `{ ...defaults, ...options }` - a caller
    // forwarding its own optional props through (e.g. <ContextMenu radius={props.radius}>) often
    // passes an *explicit* `undefined` for an omitted one, which a spread-based merge wouldn't
    // fall back to a default for (the later spread always wins, even when its value is undefined)
    const resolved: Required<IContextMenuOptions> = {
        x: options.x,
        y: options.y,
        open: options.open,
        items: options.items,
        radius: options.radius ?? 18.9,
        thickness: options.thickness ?? 31.05,
        padAngle: options.padAngle ?? 0.025,
        gapAngle: options.gapAngle ?? Math.PI / 4,
        iconSize: options.iconSize ?? 18,
        animationDuration: options.animationDuration ?? 220,
        colors: options.colors ?? DEFAULT_COLORS,
        onSelect: options.onSelect,
        onClose: options.onClose ?? (() => {}),
    };

    const instance = instances.get(container) ?? { mounted: false, radius: resolved.radius, thickness: resolved.thickness };
    instances.set(container, instance);

    if (!resolved.open) {
        // Otherwise this (portaled to document.body, so not naturally clipped) blocks clicks to
        // whatever's underneath it even while empty/closed
        container.style.pointerEvents = "none";

        // Deliberately leave position/size untouched here rather than re-reading resolved.x/y - by
        // the time a caller flips `open` to false, x/y have often already reset to a default/stale
        // value (e.g. Redux state cleared on close), and the menu should shrink away from wherever
        // it's actually showing, not jump to that stale position first
        if (instance.mounted) {
            const svg = container.querySelector<SVGSVGElement>(":scope > svg");

            if (svg) {
                shrinkAndRemove(d3.select(svg), instance, resolved.animationDuration);
            }
        }

        return;
    }

    container.style.position = "fixed";
    container.style.left = `${resolved.x}px`;
    container.style.top = `${resolved.y}px`;
    // Center (x, y) on the container rather than its top-left corner
    container.style.transform = "translate(-50%, -50%)";
    container.style.pointerEvents = "auto";
    container.style.zIndex = "9999";

    // Wide enough to fit a hovered item's outer "active" band without clipping it, even though most
    // menus never actually grow one - the extra space is transparent, so it costs nothing visually
    const size = (resolved.radius + resolved.thickness + ACTIVE_BAND_GAP + ACTIVE_BAND_THICKNESS) * 2;
    const root = ensureSvg(container, size)
        .attr("class", "chart-io context-menu")
        .on("contextmenu", (event: MouseEvent) => event.preventDefault());

    const wasMounted = instance.mounted;
    instance.mounted = true;
    instance.radius = resolved.radius;
    instance.thickness = resolved.thickness;

    if (wasMounted) {
        updateInPlace(root, resolved);
    } else {
        buildAndGrow(root, resolved);
    }

    attachCloseListeners(container, instance, resolved.onClose);
}

/**
 * Immediately tears down a `<ContextMenu>` rendered into `container` - removes its DOM and detaches
 * any window-level listeners, without animating. Call this when the container itself unmounts
 * @param  container    The HTML element previously passed to `renderContextMenu`
 */
export function destroyContextMenu(container: HTMLElement): void {
    const instance = instances.get(container);
    instance?.cleanupWindowListeners?.();
    instances.delete(container);
    d3.select(container).selectAll("*").remove();
}
