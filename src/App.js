import React from "react";
import "./index.css";
import Sheet from "./components/Sheet.js";
import Header from "./components/Header.js";

// zmienić doStatus!

function App() {
  return (
    <div className="page-content">
      <Header />
      <div className="all-sheets">
        <Sheet mainTitle="To do" doStatus="do" />
        <Sheet mainTitle="In progress" doStatus="in progress" />
        <Sheet mainTitle="Done" doStatus="done" />
      </div>
    </div>
  );
}

export default App;
