import React, { Component } from "react";
import "../style/Task.scss";

import { editTask, removeTask } from "../services/getFetch";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.name,
      showBtn: false
    };
  }


  handleChange = event => {
    this.setState({
      inputValue: event.target.value,
      showBtn: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      showBtn: false
    });
    editTask(this.props.id, this.state.inputValue, this.props.status);
  }
  
  removeOnClick = ()=> {
    removeTask(this.props.id)
};

  render() {
    return (
      <div>
        <li>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.inputValue}
              onChange={this.handleChange}
            />
            {this.state.showBtn ? <button>Click to edit</button> : null}
          </form>
          <span className="task-btn-container">
            <button onClick={this.removeOnClick}>x</button>
          </span>
        </li>
      </div>
    );
  }
}

