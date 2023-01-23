import React from "react";

import Footer from "../Footer";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";

export default class App extends React.Component {
  maxId = 0;

  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.onToggleDone = this.onToggleDone.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.addFilter = this.addFilter.bind(this);
    this.state = {
      todoData: [],
      filter: "all",
    };
  }

  addItem(value) {
    if (!value) {
      return;
    }

    const newItem = {
      id: ++this.maxId,
      completed: false,
      value,
      date: new Date().toISOString(),
    };

    this.setState((prevState) => {
      const newTodos = [...prevState.todoData, newItem];

      return {
        todoData: newTodos,
      };
    });
  }

  deleteItem(identifier) {
    this.setState((prevState) => {
      const newTodoData = prevState.todoData.filter(({ id }) => {
        return id !== identifier;
      });
      return {
        todoData: newTodoData,
      };
    });
  }

  editItem(value, identifier) {
    this.setState((prevState) => {
      const newTodoData = JSON.parse(JSON.stringify(prevState.todoData));

      newTodoData.map((el) => {
        if (el.id === identifier) {
          el.value = value;
        }
        return el;
      });

      return {
        todoData: newTodoData,
      };
    });
  }

  onToggleDone(identifier) {
    this.setState((prevState) => {
      const newTodoData = JSON.parse(JSON.stringify(prevState.todoData));

      newTodoData.map((el) => {
        if (el.id === identifier) {
          el.completed = !el.completed;
        }
        return el;
      });

      return {
        todoData: newTodoData,
      };
    });
  }

  clearCompleted() {
    this.setState((prevState) => {
      const newTodoData = prevState.todoData.filter(
        ({ completed }) => !completed
      );

      return {
        todoData: newTodoData,
      };
    });
  }

  setFilter(filter) {
    this.setState({
      filter: filter,
    });
  }

  addFilter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.completed);
      case "completed":
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  render() {
    const { todoData, filter } = this.state;

    const visibleItem = this.addFilter(todoData, filter);

    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <main className="main">
          <TaskList
            todoData={visibleItem}
            deleteItem={this.deleteItem}
            editItem={this.editItem}
            onToggleDone={this.onToggleDone}
          />
          <Footer
            todoData={todoData}
            clearCompleted={this.clearCompleted}
            setFilter={this.setFilter}
            filter={filter}
          />
        </main>
      </section>
    );
  }
}
