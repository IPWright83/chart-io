import { act, renderHook } from "@testing-library/react-hooks";

import { useContextMenu } from "./useContextMenu";

describe("useContextMenu", () => {
    it("starts closed", () => {
        const { result } = renderHook(() => useContextMenu());

        expect(result.current.isOpen).toBe(false);
        expect(result.current.x).toBe(0);
        expect(result.current.y).toBe(0);
        expect(result.current.context).toBeUndefined();
    });

    it("opens at the given coordinates with the given context", () => {
        const { result } = renderHook(() => useContextMenu<{ type: string }>());

        act(() => {
            result.current.open(12, 34, { type: "datum" });
        });

        expect(result.current.isOpen).toBe(true);
        expect(result.current.x).toBe(12);
        expect(result.current.y).toBe(34);
        expect(result.current.context).toEqual({ type: "datum" });
    });

    it("opens without a context", () => {
        const { result } = renderHook(() => useContextMenu());

        act(() => {
            result.current.open(5, 10);
        });

        expect(result.current.isOpen).toBe(true);
        expect(result.current.context).toBeUndefined();
    });

    it("closes", () => {
        const { result } = renderHook(() => useContextMenu());

        act(() => {
            result.current.open(12, 34);
        });
        expect(result.current.isOpen).toBe(true);

        act(() => {
            result.current.close();
        });

        expect(result.current.isOpen).toBe(false);
    });

    it("re-opening at a new position replaces the previous state", () => {
        const { result } = renderHook(() => useContextMenu<{ type: string }>());

        act(() => {
            result.current.open(1, 1, { type: "background" });
        });
        act(() => {
            result.current.open(2, 2, { type: "datum" });
        });

        expect(result.current.x).toBe(2);
        expect(result.current.y).toBe(2);
        expect(result.current.context).toEqual({ type: "datum" });
    });
});
