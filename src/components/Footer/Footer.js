import React from "react";

import TasksFilter from "../TasksFilter";

export default class Footer extends React.Component {
  render() {
    const completedCount = this.props.todos.reduce((acc, el) => {
      return el.completed ? ++acc : acc;
    }, 0);

    return (
      <footer className="footer">
        <span className="todo-count">{completedCount} items left</span>
        <TasksFilter />
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
}
