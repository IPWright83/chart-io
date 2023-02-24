import { IColumnInfo } from "./IColumnInfo";

/**
 * Describes meta information about a String Column
 */
export interface IStringColumnInfo extends IColumnInfo {
    /**
     * The maximum number of characters seen in the values
     */
    maxLength: number;
}
