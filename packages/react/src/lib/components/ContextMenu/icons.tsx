import React from "react";

export type IIconProps = React.SVGProps<SVGSVGElement>;

const defaults: IIconProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

/**
 * A magnifying glass with a minus - used for the "Reset zoom" action
 * @param  props     Standard SVG props, spread onto the root <svg> element
 * @return           The ResetZoomIcon component
 */
export function ResetZoomIcon(props: IIconProps) {
    return (
        <svg {...defaults} {...props}>
            <circle cx="10.5" cy="10.5" r="6.5" />
            <line x1="20" y1="20" x2="15.8" y2="15.8" />
            <line x1="7.5" y1="10.5" x2="13.5" y2="10.5" />
        </svg>
    );
}

/**
 * Two curved arrows swapping direction - used for the "Pivot" action
 * @param  props     Standard SVG props, spread onto the root <svg> element
 * @return           The PivotIcon component
 */
export function PivotIcon(props: IIconProps) {
    return (
        <svg {...defaults} {...props}>
            <path d="M4 8a6 6 0 0 1 10-4.5L17 6" />
            <path d="M17 2v4.5h-4.5" />
            <path d="M20 16a6 6 0 0 1-10 4.5L7 18" />
            <path d="M7 22v-4.5h4.5" />
        </svg>
    );
}

/**
 * An outlined pentagon with a vertex highlighted - used for the "Draw polygon" action
 * @param  props     Standard SVG props, spread onto the root <svg> element
 * @return           The DrawPolygonIcon component
 */
export function DrawPolygonIcon(props: IIconProps) {
    return (
        <svg {...defaults} {...props}>
            <path d="M12 3 20 9.5 17 19H7L4 9.5Z" />
            <circle cx="12" cy="3" r="1.4" fill="currentColor" stroke="none" />
        </svg>
    );
}

/**
 * An open eye - used for the "Show legend" action
 * @param  props     Standard SVG props, spread onto the root <svg> element
 * @return           The EyeIcon component
 */
export function EyeIcon(props: IIconProps) {
    return (
        <svg {...defaults} {...props}>
            <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

/**
 * An eye with a line through it - used for the "Hide legend" and "Hide data point" actions
 * @param  props     Standard SVG props, spread onto the root <svg> element
 * @return           The EyeOffIcon component
 */
export function EyeOffIcon(props: IIconProps) {
    return (
        <svg {...defaults} {...props}>
            <path d="M3 3l18 18" />
            <path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.2 0 10 7 10 7a17.7 17.7 0 0 1-3.4 4.3M6.7 6.7C4 8.5 2 12 2 12s3.8 7 10 7a9.7 9.7 0 0 0 4.3-1" />
            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
        </svg>
    );
}

/**
 * A crosshair/target - used for the "Focus data point" action
 * @param  props     Standard SVG props, spread onto the root <svg> element
 * @return           The FocusIcon component
 */
export function FocusIcon(props: IIconProps) {
    return (
        <svg {...defaults} {...props}>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
    );
}

/**
 * A speech tag with a plus - used for the "Add annotation" action
 * @param  props     Standard SVG props, spread onto the root <svg> element
 * @return           The AnnotationIcon component
 */
export function AnnotationIcon(props: IIconProps) {
    return (
        <svg {...defaults} {...props}>
            <path d="M4 5h16v10H11l-4 4v-4H4Z" />
            <path d="M9 10h6M12 7v6" />
        </svg>
    );
}
