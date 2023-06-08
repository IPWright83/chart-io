import { IScale } from "@chart-it/types";

export interface IBandwidthScale extends IScale {
    bandwidth?: () => number;
}
