import { IColumnInfo } from "./IColumnInfo";

/**
 * Describes meta information about a Date Column
 */
export interface IDateColumnInfo extends IColumnInfo {
    /**
     * The min/max values seen in the data
     */
    range: [Date, Date];
}
