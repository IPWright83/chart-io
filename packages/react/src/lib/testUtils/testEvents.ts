// prettier-ignore
import { fireEvent } from "@testing-library/react";

import { FakeMouseEvent, IFakeMouseEventValues } from "./FakeMouseEvent";
import { MOUSE_MOVE_THROTTLE } from "../constants";
import { wait } from "./wait";

/**
 * Simulates a click on an element
 * @param  container             The container to apply a css selector to
 * @param  selector              The css selector to apply to find the element
 * @param  callback              The callback that we expect to have been called
 * @param  expected              The arguments that we expect the callback to have been called with
 * @param  fakeMouseEventData    A fake mouse event data object
 */
export async function testMouseClick(
    container: HTMLElement,
    selector: string,
    callback: () => void,
    expected: unknown,
    fakeMouseEventData?: IFakeMouseEventValues
) {
    const element = container.querySelector(selector);

    if (fakeMouseEventData) {
        fireEvent(element, new FakeMouseEvent("click", fakeMouseEventData));
    } else {
        fireEvent.click(element);
    }

    expect(callback).toHaveBeenCalledWith(expected, expect.anything(), expect.anything());
}

/**
 * Simulates a mouse over on an element
 * @param  container             The container to apply a css selector to
 * @param  selector              The css selector to apply to find the element
 * @param  callback              The callback that we expect to have been called
 * @param  expected              The arguments that we expect the callback to have been called with
 * @param  fakeMouseEventData    A fake mouse event data object
 */
export async function testMouseOver(
    container: HTMLElement,
    selector: string,
    callback: () => void,
    expected: unknown,
    fakeMouseEventData?: IFakeMouseEventValues
) {
    const element = container.querySelector(selector);

    if (fakeMouseEventData) {
        fireEvent(element, new FakeMouseEvent("mousemove", fakeMouseEventData));
    } else {
        fireEvent.mouseOver(element);
    }

    expect(callback).toHaveBeenCalledWith(expected, expect.anything(), expect.anything());
}
/**
 * Simulates a mouse exit on an element
 * @param  container                 The container to apply a css selector to
 * @param  selector                  The css selector to apply to find the element
 * @param  callback                  The callback that we expect to have been called
 * @param  expected                  The arguments that we expect the callback to have been called with
 * @param  fakeMouseEnterEventData   A fake mouse event data object to use during the enter event
 * @param  fakeMouseExitEventData    A fake mouse event data object to use during the exit event
 */
export async function testMouseExit(
    container: HTMLElement,
    selector: string,
    callback: () => void,
    expected: unknown,
    fakeMouseEnterEventData?: IFakeMouseEventValues,
    fakeMouseExitEventData?: IFakeMouseEventValues
) {
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
}
