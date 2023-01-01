import { useState } from "react";
import "./App.css";
import Pizza from "./Pizza";
import pizzas from "../data/pizzas.json";

function App() {
  return (
    <ul>
      {pizzas.map((pizza) => {
        return <Pizza key={pizza.id} pizza={pizza} />;
      })}
    </ul>
  );
}

export default App;
