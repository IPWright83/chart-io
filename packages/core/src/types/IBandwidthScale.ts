/**
 * A scale with a bandwidth function
 */
export interface IBandwidthScale {
    bandwidth?: () => number;
}
