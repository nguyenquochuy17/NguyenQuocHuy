import React from "react";
import "./App.css";
import CurrencySwap from "./components/CurrencySwap";

function App() {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 border mt-5 bg-slate-400">
      <CurrencySwap />
    </div>
  );
}

export default App;
