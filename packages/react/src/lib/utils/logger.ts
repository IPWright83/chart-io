import { PACKAGE_NAME, STORYBOOK_URL } from "../constants";

/**
 * Log a warning to the console
 * @param {string} warningCode     The code associated with the warning
 * @param {string} message         The warning message
 * @param {any}    ...args         Any additional things to log
 */
export function logWarning(warningCode: string, message: string, ...args: any) {
    const url = `${STORYBOOK_URL}?path=/docs/errors-warnings-warnings-${warningCode}`;
    const log = `${PACKAGE_NAME} encountered an warning. ${warningCode}: ${message}. You can read more about this ${url}.`;

    if (args.length > 0) {
        console.warn(log, args);
    }

    console.warn(log);
}

/**
 * Log an error to the console
 * @param {string} errorCode     The code associated with the error
 * @param {string} message       The error message
 * @param {any}    ...args       Any additional things to log
 */
export function logError(errorCode: string, message: string, ...args: any) {
    const url = `${STORYBOOK_URL}?path=/docs/errors-warnings-errors-${errorCode}`;
    const log = `${PACKAGE_NAME} encountered an error. ${errorCode}: ${message}. You can read more about this ${url}.`;

    if (args.length > 0) {
        console.error(log, args);
    }

    console.error(log);
}

/**
 * Log a debug message to the console
 * @param {string} message       The message
 * @param {any}    ...args       Any additional things to log
 */
export function logDebug(message: string, ...args: any) {
    console.debug(PACKAGE_NAME, message, args);
}

/**
 * Log an error to the console then throw it
 * @param {string} errorCode     The code associated with the error
 * @param {string} message       The error message
 * @param {any}    ...args       Any additional things to log
 */
export function logAndThrowError(errorCode: string, message: string, ...args: any) {
    logError(errorCode, message, args);
    throw new Error(message);
}
