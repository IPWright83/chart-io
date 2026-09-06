const DEFAULTS = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

/**
 * A ready-made set of small SVG icons, sized to fit an `IContextMenuItem`'s `icon` field, for the
 * default `<ContextMenu>` actions in `./actions`. Each is complete `<svg>` markup, sized and colored
 * by the menu itself - use these directly, or as a template for your own
 */
export const contextMenuIcons = {
    /** A magnifying glass with a minus - used for the "Reset zoom" action */
    resetZoom: `<svg ${DEFAULTS}>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <line x1="20" y1="20" x2="15.8" y2="15.8" />
        <line x1="7.5" y1="10.5" x2="13.5" y2="10.5" />
    </svg>`,

    /** Two separate cells folding into one bar divided into their segments - used for the "Pivot"
     * action */
    pivot: `<svg ${DEFAULTS}>
        <rect x="2" y="4" width="8" height="7" />
        <rect x="2" y="13" width="8" height="7" />
        <path d="M12 12h4l-1.5-1.5m1.5 1.5-1.5 1.5" />
        <rect x="18" y="4" width="5" height="16" />
        <line x1="18" y1="12" x2="23" y2="12" />
    </svg>`,

    /** An outlined pentagon with a vertex highlighted - used for the "Draw polygon" action */
    drawPolygon: `<svg ${DEFAULTS}>
        <path d="M12 3 20 9.5 17 19H7L4 9.5Z" />
        <circle cx="12" cy="3" r="1.4" fill="currentColor" stroke="none" />
    </svg>`,

    /** An open eye - used for the "Show legend" action */
    eye: `<svg ${DEFAULTS}>
        <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>`,

    /** An eye with a line through it - used for the "Hide legend" and "Hide data point" actions */
    eyeOff: `<svg ${DEFAULTS}>
        <path d="M3 3l18 18" />
        <path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.2 0 10 7 10 7a17.7 17.7 0 0 1-3.4 4.3M6.7 6.7C4 8.5 2 12 2 12s3.8 7 10 7a9.7 9.7 0 0 0 4.3-1" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>`,

    /** A crosshair/target - used for the "Focus data point" action */
    focus: `<svg ${DEFAULTS}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>`,

    /** A speech tag with a plus - used for the "Add annotation" action */
    annotation: `<svg ${DEFAULTS}>
        <path d="M4 5h16v10H11l-4 4v-4H4Z" />
        <path d="M9 10h6M12 7v6" />
    </svg>`,

    /** A funnel with a diagonal slash through it - used for the "Reset filters" action */
    resetFilters: `<svg ${DEFAULTS}>
        <path d="M3 4h18l-7 8v6l-4 2v-8Z" />
        <line x1="3" y1="21" x2="21" y2="3" />
    </svg>`,
};
