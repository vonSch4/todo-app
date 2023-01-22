import React from "react";

import Task from "../Task";

export default class TaskList extends React.Component {
  render() {
    const { todos, onClickDelete } = this.props;

    return (
      <ul className="todo-list">
        {todos.map((prop) => {
          const { id: key, ...todo } = prop;
          return (
            <Task
              key={key}
              {...todo}
              onClickDelete={() => onClickDelete(key)}
            />
          );
        })}
      </ul>
    );
  }
}
