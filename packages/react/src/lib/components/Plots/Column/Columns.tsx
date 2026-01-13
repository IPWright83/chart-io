import type { IPlotsProps } from "@chart-it/types";
import React from "react";
import { useSelector } from "react-redux";

import { chartSelectors, IState } from "../../../store";
import { logAndThrowError } from "../../../utils";

import { Column } from "./Column";
import { GroupedColumn } from "./GroupedColumn";
import { StackedColumn } from "./StackedColumn";

export interface IColumnsProps extends IPlotsProps {
    /**
     * Should the column plots be stacked based on the x-value?
     */
    stacked?: boolean;
    /**
     * Should the column plots be grouped based on the x-value?
     */
    grouped?: boolean;
}

/**
 * Represents a set of Column Plots
 * @param  props       The set of React properties
 * @return             The Column plot component
 */
export function Columns({ ys, colors, stacked = false, grouped = false, ...props }: IColumnsProps) {
    const theme = useSelector((s: IState) => chartSelectors.theme(s));
    const palette = colors || theme.series.colors;

    if (stacked && grouped) {
        logAndThrowError("E003", "Column plots do not support both being stacked and grouped");
    }

    if (!stacked && !grouped) {
        logAndThrowError("E004", "Multiple Column plots must be either stacked or grouped");
    }

    if (stacked) {
        return <StackedColumn ys={ys} colors={palette} {...props} />;
    }

    if (grouped) {
        return <GroupedColumn ys={ys} colors={palette} {...props} />;
    }

    return (
        <React.Fragment>
            {ys.map((y, i) => (
                <Column {...props} key={y} y={y} color={palette[i]} />
            ))}
        </React.Fragment>
    );
}

Columns.requiresVirtualCanvas = true;
