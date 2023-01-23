import React from "react";

import TasksFilter from "../TasksFilter";

export default class Footer extends React.Component {
  render() {
    const { todoData, clearCompleted, setFilter, filter } = this.props;

    const completedCount = todoData.filter(
      ({ completed }) => !completed
    ).length;

    return (
      <footer className="footer">
        <span className="todo-count">{completedCount} items left</span>
        <TasksFilter setFilter={setFilter} filter={filter} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
