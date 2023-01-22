import React from "react";

import Footer from "../Footer";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.state = {
      todos: [],
    };
  }

  addItem(evt) {
    if (evt.code === "Enter") {
      evt.preventDefault();

      console.log(evt.target.value);

      this.setState((prevState) => {
        const newItem = {
          id: prevState.todos.length ? prevState.todos.length + 1 : 1,
          editing: false,
          value: evt.target.value,
          date: new Date().toLocaleTimeString(),
        };

        const newTodos = [...prevState.todos, newItem];

        evt.target.value = "";

        return {
          todos: newTodos,
        };
      });
    }
  }

  deleteItem(identificator) {
    this.setState((prevState) => {
      const items = prevState.todos.filter(({ id }) => {
        return id !== identificator;
      });
      return {
        todos: items,
      };
    });
  }

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <main className="main">
          <TaskList todos={todos} onClickDelete={this.deleteItem} />
          <Footer todos={todos} />
        </main>
      </section>
    );
  }
}
