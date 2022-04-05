export type INumberColumnInfo = IBaseColumnInfo & {
  range: Array<number>;
  isAllNegative: boolean;
  isAllPositive: boolean;
  isPossiblePercentage: boolean;
  isPossibleCurrency: boolean;
  type: "Integer" | "Double" | "BigInt";

  Unknown: 1000;
  Null: 210;
  Boolean: 200;
  Integer: 190;
  Double: 180;
  Date: 170;
  DateTime: 160;
  String: 150;
};

export type IDateColumnInfo = IBaseColumnInfo & {
  range: Array<Date>;
  type: "Date" | "DateTime";
};

export type IStringColumnInfo = IBaseColumnInfo & {
  maxLength: number;
  type: "String";
};

export type IBooleanColumnInfo = IBaseColumnInfo & {
  type: "Boolean";
};

export type IBaseColumnInfo = {
  key: string;
  count: number;
  nullCount: number;
  cardinality: number;
  type: "Unknown";
};

export type IColumnInfo =
  | INumberColumnInfo
  | IDateColumnInfo
  | IStringColumnInfo
  | IBooleanColumnInfo;
