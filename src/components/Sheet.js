import React, { Component } from "react";
import "../style/Sheet.scss";

import { addNewTask } from "../services/getFetch";
import Task from "./Task";

export default class Sheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addInputValue: ""
    };
  }

  onAddInputChange = (event) => {
    this.setState({
      addInputValue: event.target.value
    });
  };

  addOnSubmit = (event) => {
    event.preventDefault();
    if(this.state.addInputValue.length>3){

      addNewTask(
        this.state.addInputValue,
        this.props.mainTitle.toLocaleLowerCase()
        ).then(() => {
          this.setState({
            addInputValue: ""
          })
          this.props.onChange();
        });
      }
      else{
        alert("Wprowadź poprawne zadanie")
      }

  };

  render() {
    const { mainTitle, tasks } = this.props;
    const allTaskElements = tasks.map((element, i) => {
      return (
        <Task
          id={element.id}
          name={element.name}
          status={element.status}
          key={element.id + "num"}
          onUpdate={this.props.onChange}
        />
        );
    });


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
