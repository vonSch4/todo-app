import React from "react";

import Footer from "../Footer";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";

export default class App extends React.Component {
  todos = [
    {
      id: 1,
      completed: true,
      editing: false,
      value: "Completed task",
      date: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      completed: false,
      editing: true,
      value: "Editing task",
      date: new Date().toLocaleTimeString(),
    },
    {
      id: 3,
      completed: false,
      editing: false,
      value: "Active task",
      date: new Date().toLocaleTimeString(),
    },
  ];

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm />
        <main className="main">
          <TaskList todos={this.todos} />
          <Footer todos={this.todos} />
        </main>
      </section>
    );
  }
}
