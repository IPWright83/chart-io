import { XYChart, XAxis, YAxis, Scatter } from "@chart-it/react-d3";

import logo from './logo.svg';
import './App.css';


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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <XYChart data={data}>
            <YAxis fields={[y]} />
            <XAxis fields={[x]} />
            <Scatter x={x} y={y}  />
         </XYChart>
      </header>
    </div>
  );
}

export default App;
