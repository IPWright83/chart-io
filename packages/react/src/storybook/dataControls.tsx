import React, { useState } from "react";

// Storybook-only helpers for exercising a chart's enter/update/exit animations by hand. Not part
// of the public library - used to wrap the "Basic Plot"/"Canvas" stories with buttons that mutate
// their underlying data.

function jitter(value: number, amount: number): number {
  return value + (Math.random() * 2 - 1) * amount * Math.max(Math.abs(value), 1);
}

// Nudges every listed numeric field on a row by a random +/- `amount` fraction of its own
// magnitude, leaving any other fields (categories, dates, ids) untouched.
export function jitterFields<T extends Record<string, unknown>>(
  row: T,
  fields: readonly string[],
  amount = 0.2,
): T {
  const next = { ...row };
  for (const field of fields) {
    const value = next[field];
    if (typeof value === "number") {
      (next as Record<string, unknown>)[field] = jitter(value, amount);
    }
  }
  return next;
}

export interface DataControlsConfig<T> {
  initialData: T[];
  randomize: (row: T) => T;
  createPoint: (data: T[]) => T;
  // Smallest array length `removePoint` will reduce down to, so a chart never animates to empty.
  minLength?: number;
}

export function useDataControls<T>(config: DataControlsConfig<T>) {
  const [data, setData] = useState(config.initialData);
  const minLength = config.minLength ?? 1;

  const randomizeValues = () => setData((current) => current.map(config.randomize));

  const addPoint = () => setData((current) => [...current, config.createPoint(current)]);

  const removePoint = () =>
    setData((current) => {
      if (current.length <= minLength) {
        return current;
      }
      const index = Math.floor(Math.random() * current.length);
      return current.filter((_, i) => i !== index);
    });

  return { data, randomizeValues, addPoint, removePoint };
}

const buttonStyle: React.CSSProperties = {
  padding: "6px 12px",
  border: "1px solid #99C1DC",
  borderRadius: 4,
  background: "#fff",
  cursor: "pointer",
  fontSize: 13,
  whiteSpace: "nowrap",
};

export function DataControls({
  onRandomize,
  onAdd,
  onRemove,
}: {
  onRandomize: () => void;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <button type="button" style={buttonStyle} onClick={onRandomize}>
        Randomize Values
      </button>
      <button type="button" style={buttonStyle} onClick={onAdd}>
        Add Data Point
      </button>
      <button type="button" style={buttonStyle} onClick={onRemove}>
        Remove Random Point
      </button>
    </div>
  );
}

// Wraps a story's render template so it owns its own copy of `config.initialData` (seeded from
// `args.data` when the story already parameterizes it) and renders the three controls beside it.
//
// The controls sit *after* the chart in a flex row (not above it) so the chart's own bounding box
// - and so the fixed clientX/clientY coordinates the play() interaction tests click at - never
// moves, regardless of whether the controls are present.
export function withDataControls<T, A extends { data?: T[] }>(
  Template: (args: A) => JSX.Element,
  config: DataControlsConfig<T>,
) {
  return function TemplateWithDataControls(args: A) {
    const { data, randomizeValues, addPoint, removePoint } = useDataControls({
      ...config,
      initialData: args.data ?? config.initialData,
    });
    return (
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <Template {...args} data={data} />
        <DataControls onRandomize={randomizeValues} onAdd={addPoint} onRemove={removePoint} />
      </div>
    );
  };
}
