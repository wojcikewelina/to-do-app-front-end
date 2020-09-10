import React, { Component } from "react";
import "../style/Sheet.scss";

import { getAllTasksApi, addNewTask } from "../services/getFetch";
import Task from "./Task";

let allTaskElements = [];

export default class Sheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      status: this.props.doStatus,
      addInputValue: ""
    };
  }

 
  componentDidMount() {
    this.getApi();
  }

  componentDidUpdate() {
    this.getApi();
  }

  getApi = () => {
    getAllTasksApi()
      .then(result => {
        this.setState({
          apiData: result
        });
      });
  }

  onAddInputChange = event => {
    this.setState({
      addInputValue: event.target.value
    });
  };

  addOnSubmit = event => {
    event.preventDefault();
    addNewTask(this.state.addInputValue, this.props.doStatus)
      .then(() => {
        this.setState({
          addInputValue: ""
        })
      });
  };


  editOnClick = () => {
    alert("test");
  }

  render() {
    const { mainTitle, doStatus } = this.props;
    allTaskElements = this.state.apiData.map((element, i) => {

      if (element.status === doStatus) {
        return (
          <Task
            id={element.id}
            name={element.name}
            status={element.status}
            key={element.id + "num"}
          />
        );
      }
    })


    return (
      <div className="sheet-box">
        <h3>{mainTitle}</h3>
        <ul>{allTaskElements}</ul>
        <div className="emptyDiv" />
        <span className="add-task-part">
          <form onSubmit={this.addOnSubmit}>
            <input
              type="text"
              placeholder="Wprowadź nazwę"
              onChange={this.onAddInputChange}
              value={this.state.addInputValue}
            />
            <button>Add new task</button>
          </form>
        </span>
      </div>
    );
  }
}
