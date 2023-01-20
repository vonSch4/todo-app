import React from "react";

import Task from "../Task";

export default class TaskList extends React.Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map((prop) => {
          const { id: key, ...todo } = prop;
          return <Task key={key} todo={todo} />;
        })}
      </ul>
    );
  }
}
