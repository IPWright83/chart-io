import { d3 } from "../d3";
import type { IContextMenuItem, ITheme } from "../types";

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
    /** The x-coordinate to anchor the menu at */
    x: number;
    /** The y-coordinate to anchor the menu at */
    y: number;
    /**
     * Whether the menu should be shown. Segments grow out from the center when this becomes `true`,
     * and shrink back in when it becomes `false`
     */
    open: boolean;
    /** The pluggable set of actions to show as segments, clockwise from 12 o'clock */
    items: IContextMenuItem[];
    /**
     * The inner radius of the ring, in pixels
     * @default 28
     */
    radius?: number;
    /**
     * The depth of each segment, in pixels
     * @default 46
     */
    thickness?: number;
    /**
     * The angular gap, in radians, to leave between each segment
     * @default 0.025
     */
    padAngle?: number;
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

const instances = new WeakMap<SVGGElement, IContextMenuInstance>();

const DEFAULT_COLORS: ITheme["menu"] = {
    background: "#4679bd",
    backgroundHover: "#6b95cf",
    backgroundDisabled: "#a0aec0",
    text: "#ffffff",
    border: "#ffffff",
};

type IArc = d3.PieArcDatum<IContextMenuItem>;

/**
 * Attaches (once per open session) the Escape/click-outside listeners that close the menu
 * @param  container    The menu's root `<g>` element - clicks inside it don't count as "outside"
 * @param  instance     This container's tracked instance state, used to avoid attaching twice
 * @param  onClose      Called when Escape is pressed, or a click/tap lands outside `container`
 */
function attachCloseListeners(container: SVGGElement, instance: IContextMenuInstance, onClose?: () => void) {
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

/**
 * Renders the ring of segments for a freshly-opened menu, growing each segment's outer radius out
 * from the center
 * @param  root         A selection wrapping the menu's root `<g>` element
 * @param  options      The menu's fully-resolved configuration
 */
function buildAndGrow(root: d3.Selection<SVGGElement, unknown, null, undefined>, options: Required<IContextMenuOptions>) {
    const { items, radius, thickness, padAngle, iconSize, animationDuration, colors, onSelect } = options;

    const pie = d3.pie<IContextMenuItem>().value(() => 1).padAngle(padAngle).sort(null);
    const arcs = pie(items);
    const arcGenerator = d3.arc<IArc>().innerRadius(radius).cornerRadius(3);

    const join = root
        .selectAll<SVGGElement, IArc>(".chart-io.context-menu-item")
        .data(arcs, (d) => d.data.id);

    join.exit().remove();

    const enter = join.enter().append("g").attr("class", "chart-io context-menu-item");
    enter.append("path");
    enter.append("g").attr("class", "chart-io context-menu-icon");

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
        })
        .on("mouseleave", function (_event, d) {
            if (d.data.disabled) return;
            d3.select(this).style("fill", colors.background?.toString() ?? null);
        })
        .on("click", (_event, d) => {
            if (d.data.disabled) return;
            onSelect(d.data);
        });

    paths.selectAll("title").data((d) => [d]).join("title").text((d) => d.data.label);

    merged
        .select<SVGGElement>(".chart-io.context-menu-icon")
        .style("pointer-events", "none")
        .style("color", colors.text?.toString() ?? null)
        .each(function (d) {
            const node = d3.select(this);
            // Only (re)write markup when the icon actually changes, to avoid clobbering it every render
            if (node.attr("data-icon") !== d.data.id) {
                node.attr("data-icon", d.data.id).html(d.data.icon);
            }
            node.select("svg").attr("width", iconSize).attr("height", iconSize);
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
 * @param  root         A selection wrapping the menu's root `<g>` element
 * @param  options      The menu's fully-resolved configuration
 */
function updateInPlace(root: d3.Selection<SVGGElement, unknown, null, undefined>, options: Required<IContextMenuOptions>) {
    const { items, radius, thickness, padAngle, iconSize, colors, onSelect } = options;

    const pie = d3.pie<IContextMenuItem>().value(() => 1).padAngle(padAngle).sort(null);
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

    merged
        .select<SVGGElement>(".chart-io.context-menu-icon")
        .attr("transform", (d) => {
            const [ix, iy] = arcGenerator.centroid(d);
            return `translate(${ix - iconSize / 2}, ${iy - iconSize / 2})`;
        })
        .select("svg")
        .attr("width", iconSize)
        .attr("height", iconSize);
}

/**
 * Shrinks every segment back down to the center, then removes them and detaches the close listeners
 * @param  root                 A selection wrapping the menu's root `<g>` element
 * @param  instance             This container's tracked instance state
 * @param  animationDuration    How long, in milliseconds, the shrink transition takes
 */
function shrinkAndRemove(
    root: d3.Selection<SVGGElement, unknown, null, undefined>,
    instance: IContextMenuInstance,
    animationDuration: number,
) {
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
 * Renders (or updates, or closes) a pluggable radial `<ContextMenu>` into the given SVG `<g>`
 * container - a framework-agnostic D3 module, independent of any particular rendering framework, so
 * the same implementation can be shared across e.g. `@chart-io/react` and `@chart-io/svelte`.
 *
 * Every icon, label and click handler comes from `options.items`, so the same module can show a
 * completely different set of actions depending on what it was opened on. Call this again whenever
 * `options` changes (e.g. from a `useEffect`/reactive statement) - it diffs against the container's
 * previous state rather than tearing everything down each time. Call `destroyContextMenu` once the
 * container itself is going away
 * @param  container    The SVG `<g>` element to render into
 * @param  options      The menu's configuration
 */
export function renderContextMenu(container: SVGGElement, options: IContextMenuOptions): void {
    // Resolve field-by-field with `??` rather than `{ ...defaults, ...options }` - a caller
    // forwarding its own optional props through (e.g. <ContextMenu radius={props.radius}>) often
    // passes an *explicit* `undefined` for an omitted one, which a spread-based merge wouldn't
    // fall back to a default for (the later spread always wins, even when its value is undefined)
    const resolved: Required<IContextMenuOptions> = {
        x: options.x,
        y: options.y,
        open: options.open,
        items: options.items,
        radius: options.radius ?? 28,
        thickness: options.thickness ?? 46,
        padAngle: options.padAngle ?? 0.025,
        iconSize: options.iconSize ?? 18,
        animationDuration: options.animationDuration ?? 220,
        colors: options.colors ?? DEFAULT_COLORS,
        onSelect: options.onSelect,
        onClose: options.onClose ?? (() => {}),
    };

    const instance = instances.get(container) ?? { mounted: false, radius: resolved.radius, thickness: resolved.thickness };
    instances.set(container, instance);

    const root = d3.select(container).attr("class", "chart-io context-menu");

    if (!resolved.open) {
        if (instance.mounted) {
            shrinkAndRemove(root, instance, resolved.animationDuration);
        }
        return;
    }

    root
        .attr("transform", `translate(${resolved.x}, ${resolved.y})`)
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
 * @param  container    The SVG `<g>` element previously passed to `renderContextMenu`
 */
export function destroyContextMenu(container: SVGGElement): void {
    const instance = instances.get(container);
    instance?.cleanupWindowListeners?.();
    instances.delete(container);
    d3.select(container).selectAll("*").remove();
}
