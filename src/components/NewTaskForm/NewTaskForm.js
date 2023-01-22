import React from "react";

export default class NewTaskForm extends React.Component {
  render() {
    const { addItem } = this.props;

    return (
      <form className="header">
        <h1>todos</h1>
        <label>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={addItem}
          />
        </label>
      </form>
    );
  }
}
