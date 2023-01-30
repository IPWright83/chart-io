import { IColumnInfo } from "./IColumnInfo";

/**
 * Describes meta information about a Numeric Column
 */
export interface INumericColumnInfo extends IColumnInfo {
    /**
     * The min/max values seen in the data
     */
    range: [number, number];
    /**
     * Are all values negative?
     */
    isAllNegative: boolean;
    /**
     * Are all values positive?
     */
    isAllPositive: boolean;
    /**
     * Are all values between 0-100?
     */
    isPossiblePercentage: boolean;
}
