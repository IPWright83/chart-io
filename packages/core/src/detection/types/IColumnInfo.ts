/**
 * Describes meta information about a Column
 */
export interface IColumnInfo {
    /**
     * The name of the field
     */
    key: string;
    /**
     * The number of data points counted
     */
    count: number;
    /**
     * The number of null values counted
     */
    nullCount: number;
    /**
     * The number of distinct values counted
     */
    cardinality: number;
    /**
     * The data type
     */
    type: string;
}
