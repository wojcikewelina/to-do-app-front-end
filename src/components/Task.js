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


  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    editTask(this.props.id, this.state.inputValue, this.props.status).then(
      () => {
        this.props.onUpdate();
      })
  }

  removeOnClick = () => {
    removeTask(this.props.id).then(
      () => {
        this.props.onUpdate()
      })
  };

  toogleShowButton = () => {
    this.setState((oldState) => {
      return {
        showBtn: !oldState.showBtn,
      };
    });
  }
  render() {
    return (
      <div>
        <li>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.inputValue}
              onChange={this.handleChange}
              onFocus={this.toogleShowButton}
              onBlur={this.toogleShowButton}
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

