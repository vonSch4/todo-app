import React from "react";

export default class Task extends React.Component {
  render() {
    const todo = this.props.todo;
    let liClassName = null;
    let inputEditing = null;

    if (todo.completed) {
      liClassName = "completed";
    } else if (todo.editing) {
      liClassName = "editing";
      inputEditing = (
        <input type="text" className="edit" defaultValue={todo.value}></input>
      );
    }

    return (
      <li className={liClassName}>
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>
            <span className="description">{this.props.todo.value}</span>
            <span className="created">{this.props.todo.date}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        {inputEditing}
      </li>
    );
  }
}
