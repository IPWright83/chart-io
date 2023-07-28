import { renderHook } from "@testing-library/react-hooks";
import { useArray } from "./useArray"; // Replace 'your-module' with the actual path to the module containing the useArray hook.

describe("useArray", () => {
    test("should return an empty array when input is null", () => {
        const { result } = renderHook(() => useArray(null));
        expect(result.current).toEqual([]);
    });

    test("should return an empty array when input is undefined", () => {
        const { result } = renderHook(() => useArray(undefined));
        expect(result.current).toEqual([]);
    });

    test("should return an array with a single string when input is a string", () => {
        const { result } = renderHook(() => useArray("test"));
        expect(result.current).toEqual(["test"]);
    });

    test("should return the same array when input is already an array", () => {
        const input = ["test1", "test2"];
        const { result, rerender } = renderHook(() => useArray(input));

        // Re-render with the same input should return the same array reference
        rerender();
        expect(result.current).toBe(input);
    });

    test("should return a new array reference when input changes", () => {
        const input = ["test1", "test2"];
        const { result, rerender } = renderHook((props) => useArray(props), {
            initialProps: input,
        });

        // Re-render with a different input should return a new array reference
        rerender(["test3", "test4"]);
        expect(result.current).toEqual(["test3", "test4"]);
        expect(result.current).not.toBe(input);
    });
});
