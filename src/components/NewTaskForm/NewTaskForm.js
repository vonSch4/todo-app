import React from "react";

export default class NewTaskForm extends React.Component {
  render() {
    return (
      <form className="header">
        <h1>todos</h1>
        <label>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
          />
        </label>
      </form>
    );
  }
}
