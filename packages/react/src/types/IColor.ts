export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

/**
 * Used to represent different types of color
 */
export type IColor = RGB | RGBA | HEX;
