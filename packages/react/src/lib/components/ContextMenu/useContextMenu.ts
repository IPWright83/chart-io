import { useCallback, useState } from "react";

export interface IContextMenuState<TContext> {
    x: number;
    y: number;
    context?: TContext;
}

export interface IUseContextMenu<TContext> {
    /**
     * Whether the menu is currently open
     */
    isOpen: boolean;
    /**
     * The x-coordinate the menu is anchored at
     */
    x: number;
    /**
     * The y-coordinate the menu is anchored at
     */
    y: number;
    /**
     * The context the menu was last opened with
     */
    context?: TContext;
    /**
     * Opens the menu at the given coordinates
     * @param  x         The x-coordinate to anchor the menu at
     * @param  y         The y-coordinate to anchor the menu at
     * @param  context   Optional context describing what the menu was opened on (e.g. a datum)
     */
    open: (x: number, y: number, context?: TContext) => void;
    /**
     * Closes the menu
     */
    close: () => void;
}

/**
 * Manages the open/closed state, position and context for a `<ContextMenu>`. Deliberately kept
 * independent of how the menu ends up being triggered (a right-click, a long-press, a toolbar
 * button, ...) and of Redux, so it can be reused both inside and outside a chart
 * @return         The current menu state, and functions to open/close it
 */
export function useContextMenu<TContext = unknown>(): IUseContextMenu<TContext> {
    const [state, setState] = useState<IContextMenuState<TContext> | null>(null);

    const open = useCallback((x: number, y: number, context?: TContext) => {
        setState({ x, y, context });
    }, []);

    const close = useCallback(() => setState(null), []);

    return {
        isOpen: state !== null,
        x: state?.x ?? 0,
        y: state?.y ?? 0,
        context: state?.context,
        open,
        close,
    };
}
