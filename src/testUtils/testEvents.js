// prettier-ignore
import { fireEvent, act } from "@testing-library/react";

import { FakeMouseEvent } from "./FakeMouseEvent";
import { wait } from "./wait";
import { MOUSE_MOVE_THROTTLE } from "../hoc/canvas/virtual/addEventHandlers";

/**
 * [description]
 * @param  {[type]}   container [description]
 * @param  {[type]}   selector  [description]
 * @param  {Function} callback  [description]
 * @param  {[type]}   expected  [description]
 * @return {[type]}             [description]
 */
export const testMouseClick = async (container, selector, callback, expected, fakeMouseEventData) => {
    const element = container.querySelector(selector);

    if (fakeMouseEventData) {
        fireEvent(element, new FakeMouseEvent("click", fakeMouseEventData));
    } else {
        fireEvent.click(element);
    }

    expect(callback).toHaveBeenCalledWith(expected, expect.anything(), expect.anything());
};

export const testMouseOver = async (container, selector, callback, expected, fakeMouseEventData) => {
    const element = container.querySelector(selector);

    if (fakeMouseEventData) {
        fireEvent(element, new FakeMouseEvent("mousemove", fakeMouseEventData));
    } else {
        fireEvent.mouseOver(element);
    }

    expect(callback).toHaveBeenCalledWith(expected, expect.anything(), expect.anything());
};

export const testMouseExit = async (
    container,
    selector,
    callback,
    expected,
    fakeMouseEnterEventData,
    fakeMouseExitEventData,
) => {
    const element = container.querySelector(selector);

    if (fakeMouseEnterEventData) {
        fireEvent(element, new FakeMouseEvent("mousemove", fakeMouseEnterEventData));

        await wait(MOUSE_MOVE_THROTTLE * 2);

        fireEvent(
            element,
            new FakeMouseEvent(
                "mousemove",
                fakeMouseExitEventData ?? {
                    pageX: 95,
                    pageY: 95,
                },
            ),
        );
    } else {
        fireEvent.mouseOver(element);
        fireEvent.mouseLeave(element);
    }

    expect(callback).toHaveBeenCalledWith(expected, expect.anything(), expect.anything());
};
