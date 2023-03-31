import React from "react";
import { XYChart, XAxis, YAxis, Scatter } from "@d3-chart/react";

import "./App.css";

function App() {
  const x = "x";
  const y = "y";
  const data = [
    { x: 5, y: 5 },
    { x: 10, y: 10 },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <XYChart data={data}>
          <YAxis fields={y} />
          <XAxis fields={x} />
          <Scatter x={x} y={y} />
        </XYChart>
      </header>
    </div>
  );
}

export default App;
