import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Footer from '../Footer';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';

const filters = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

export default class App extends React.Component {
  static addFilter(items, filter) {
    switch (filter) {
      case filters.all:
        return items;
      case filters.active:
        return items.filter((item) => !item.completed);
      case filters.completed:
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  static saveToLocalStorage(data) {
    localStorage.setItem('todoData', JSON.stringify(data));
  }

  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.onToggleDone = this.onToggleDone.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.state = {
      todoData: [],
      filter: filters.all,
    };
  }

  componentDidMount() {
    let savedTodoData = localStorage.getItem('todoData');

    if (savedTodoData) {
      try {
        savedTodoData = JSON.parse(savedTodoData);
      } catch (e) {
        throw new Error(e.message);
      }

      this.setState(() => {
        return {
          todoData: savedTodoData,
        };
      });
    }
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

      App.saveToLocalStorage(newTodoData);

      return {
        todoData: newTodoData,
      };
    });
  }

  setFilter(filter) {
    this.setState({
      filter,
    });
  }

  addItem(value) {
    if (!value) {
      return;
    }

    const newItem = {
      id: uuidv4(),
      completed: false,
      value,
      date: new Date().toISOString(),
    };

    this.setState((prevState) => {
      const newTodoData = [...prevState.todoData, newItem];

      App.saveToLocalStorage(newTodoData);

      return {
        todoData: newTodoData,
      };
    });
  }

  deleteItem(identifier) {
    this.setState((prevState) => {
      const newTodoData = prevState.todoData.filter(
        ({ id }) => id !== identifier
      );

      App.saveToLocalStorage(newTodoData);

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

      App.saveToLocalStorage(newTodoData);

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

      App.saveToLocalStorage(newTodoData);

      return {
        todoData: newTodoData,
      };
    });
  }

  render() {
    const { todoData, filter } = this.state;

    const visibleItem = App.addFilter(todoData, filter);

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
            filters={filters}
            filter={filter}
          />
        </main>
      </section>
    );
  }
}
