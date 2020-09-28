import React, { useState, useEffect } from "react";
import "./index.scss";
import Sheet from "./components/Sheet.js";
import Header from "./components/Header.js";
import { getAllTasksApi } from "./services/getFetch";
import Login from "./components/Login";


function App() {

  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    getTasksFromApi();
  }, []);

  function getTasksFromApi() {
    getAllTasksApi().then((allTask) => {
      setApiData(allTask)
      console.log(allTask)
    });
  }

  return (
    <div className="page-content">
      <Login/>
      <Header />
      <div className="all-sheets">
        <Sheet
          mainTitle="To do"
          tasks={apiData.filter((task) => task.status === "to do")}
          onChange={getTasksFromApi} />
        <Sheet
          mainTitle="In progress"
          tasks={apiData.filter((task) => task.status === "in progress")}
          onChange={getTasksFromApi} />
        <Sheet
          mainTitle="Done"
          tasks={apiData.filter((task) => task.status === "done")}
          onChange={getTasksFromApi} />
      </div>
    </div>
  );
}

export default App;
