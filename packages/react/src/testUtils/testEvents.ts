// prettier-ignore
import { fireEvent } from "@testing-library/react";

import { FakeMouseEvent } from "./FakeMouseEvent";
import { wait } from "./wait";
import { MOUSE_MOVE_THROTTLE } from "../constants";

/**
 * Simulates a click on an element
 * @param  {HTMLElement}  container             The container to apply a css selector to
 * @param  {String}       selector              The css selector to apply to find the element
 * @param  {Function}     callback              The callback that we expect to have been called
 * @param  {Array}        expected              The arguments that we expect the callback to have been called with
 * @param  {Object}       fakeMouseEventData    A fake mouse event data object
 */
export const testMouseClick = async (
    container: HTMLElement,
    selector: string,
    callback: () => void,
    expected: unknown,
    fakeMouseEventData?: unknown
) => {
    const element = container.querySelector(selector);

    if (fakeMouseEventData) {
        fireEvent(element, new FakeMouseEvent("click", fakeMouseEventData));
    } else {
        fireEvent.click(element);
    }

    expect(callback).toHaveBeenCalledWith(expected, expect.anything(), expect.anything());
};

/**
 * Simulates a mouse over on an element
 * @param  {HTMLElement}  container             The container to apply a css selector to
 * @param  {String}       selector              The css selector to apply to find the element
 * @param  {Function}     callback              The callback that we expect to have been called
 * @param  {Array}        expected              The arguments that we expect the callback to have been called with
 * @param  {Object}       fakeMouseEventData    A fake mouse event data object
 */
export const testMouseOver = async (
    container: HTMLElement,
    selector: string,
    callback: () => void,
    expected: unknown,
    fakeMouseEventData?: unknown
) => {
    const element = container.querySelector(selector);

    if (fakeMouseEventData) {
        fireEvent(element, new FakeMouseEvent("mousemove", fakeMouseEventData));
    } else {
        fireEvent.mouseOver(element);
    }

    expect(callback).toHaveBeenCalledWith(expected, expect.anything(), expect.anything());
};
/**
 * Simulates a mouse exit on an element
 * @param  {HTMLElement}  container                 The container to apply a css selector to
 * @param  {String}       selector                  The css selector to apply to find the element
 * @param  {Function}     callback                  The callback that we expect to have been called
 * @param  {Array}        expected                  The arguments that we expect the callback to have been called with
 * @param  {Object}       fakeMouseEnterEventData   A fake mouse event data object to use during the enter event
 * @param  {Object}       fakeMouseExitEventData    A fake mouse event data object to use during the exit event
 */
export const testMouseExit = async (
    container: HTMLElement,
    selector: string,
    callback: () => void,
    expected: unknown,
    fakeMouseEnterEventData?: unknown,
    fakeMouseExitEventData?: unknown
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
                }
            )
        );
    } else {
        fireEvent.mouseOver(element);
        fireEvent.mouseLeave(element);
    }

    expect(callback).toHaveBeenCalledWith(expected, expect.anything(), expect.anything());
};
