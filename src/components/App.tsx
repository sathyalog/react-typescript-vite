import { useState } from "react";
import "./App.css";
import Pizza from "./Pizza";
import pizzas from "../data/pizzas.json";
import Cart from "./Cart";
import AppStateProvider from "./AppContext";

function App() {
  return (
    <AppStateProvider>
      <div className="container">
        <div className="header">
          <div className="siteTitle">Delicious Pizza</div>
          <Cart />
          <ul>
            {pizzas.map((pizza) => {
              return <Pizza key={pizza.id} pizza={pizza} />;
            })}
          </ul>
        </div>
      </div>
    </AppStateProvider>
  );
}

export default App;
