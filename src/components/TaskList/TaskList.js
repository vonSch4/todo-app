import React from "react";

import Task from "../Task";

export default class TaskList extends React.Component {
  render() {
    const { todoData, deleteItem, editItem, onToggleDone } = this.props;

    return (
      <ul className="todo-list">
        {todoData.map((prop) => {
          const { id: key } = prop;
          return (
            <Task
              key={key}
              {...prop}
              deleteItem={deleteItem}
              editItem={editItem}
              onToggleDone={onToggleDone}
            />
          );
        })}
      </ul>
    );
  }
}
