import { childrenToArray } from "../../utils";

/**
 * Determine if a Virtual Canvas is required or not
 * @param  children  The child or children of the virtual canvas
 * @return           True if a virtual canvas is required, otherwise false
 */
export const isVirtualCanvasRequired = (children: any): boolean => {
    return childrenToArray(children).filter((c) => c?.type?.requiresVirtualCanvas).length > 0;
};
