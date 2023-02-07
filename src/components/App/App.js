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

const timers = {};

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
    this.setTaskTimer = this.setTaskTimer.bind(this);
    this.timerPause = this.timerPause.bind(this);
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

  componentDidUpdate() {
    const { todoData } = this.state;

    todoData.forEach(({ completed, paused, id }) => {
      if (!completed && !paused) {
        this.setTaskTimer(id);
      }

      if (completed || paused) {
        this.timerPause(id);
      }
    });
  }

  onToggleDone(identifier) {
    this.setState((prevState) => {
      const newTodoData = JSON.parse(JSON.stringify(prevState.todoData));

      newTodoData.map((el) => {
        if (el.id === identifier) {
          el.completed = !el.completed;
          el.paused = el.completed;
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

  setTaskTimer(identifier) {
    if (timers[identifier]) return;

    this.setState((prevState) => {
      const newTodoData = JSON.parse(JSON.stringify(prevState.todoData));

      newTodoData.map((el) => {
        if (el.id === identifier) {
          if (!timers[el.id] && !el.completed && el.time) {
            timers[el.id] = setInterval(() => {
              this.tick(el.id);
            }, 1000);

            el.paused = false;
          }
        }
        return el;
      });

      return {
        todoData: newTodoData,
      };
    });
  }

  tick(identifier) {
    this.setState((prevState) => {
      const newTodoData = JSON.parse(JSON.stringify(prevState.todoData));

      newTodoData.map((el) => {
        if (el.id === identifier) {
          if (el.time === 0) {
            clearInterval(timers[el.id]);
            delete timers[el.id];
            return el;
          }

          el.time -= 1;
        }
        return el;
      });

      App.saveToLocalStorage(newTodoData);

      return {
        todoData: newTodoData,
      };
    });
  }

  timerPause(identifier) {
    if (!timers[identifier]) return;

    clearInterval(timers[identifier]);
    delete timers[identifier];

    this.setState((prevState) => {
      const newTodoData = JSON.parse(JSON.stringify(prevState.todoData));

      newTodoData.map((el) => {
        if (el.id === identifier) {
          el.paused = true;
        }
        return el;
      });

      App.saveToLocalStorage(newTodoData);

      return {
        todoData: newTodoData,
      };
    });
  }

  addItem(value, time) {
    const newItem = {
      id: uuidv4(),
      completed: false,
      paused: false,
      value,
      time,
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
            visibleItem={visibleItem}
            deleteItem={this.deleteItem}
            editItem={this.editItem}
            onToggleDone={this.onToggleDone}
            setTaskTimer={this.setTaskTimer}
            timerPause={this.timerPause}
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
