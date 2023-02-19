import React, { useEffect, useState } from 'react';
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

const addFilter = (items, filter) => {
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
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('todoData', JSON.stringify(data));
};

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState(filters.all);

  const onToggleDone = (identifier) => {
    setTodoData((prevData) => {
      const newTodoData = structuredClone(prevData);

      newTodoData.map((el) => {
        if (el.id === identifier) {
          el.completed = !el.completed;
          el.paused = el.completed;
        }
        return el;
      });

      saveToLocalStorage(newTodoData);

      return newTodoData;
    });
  };

  const tick = (identifier) => {
    setTodoData((prevData) => {
      const newTodoData = structuredClone(prevData);

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

      saveToLocalStorage(newTodoData);

      return newTodoData;
    });
  };

  const setTaskTimer = (identifier) => {
    if (timers[identifier]) return;

    setTodoData((prevData) => {
      const newTodoData = structuredClone(prevData);

      newTodoData.map((el) => {
        if (el.id === identifier) {
          if (!timers[el.id] && !el.completed && el.time) {
            timers[el.id] = setInterval(() => {
              tick(el.id);
            }, 1000);

            el.paused = false;
          }
        }

        return el;
      });

      return newTodoData;
    });
  };

  const timerPause = (identifier) => {
    if (!timers[identifier]) return;

    clearInterval(timers[identifier]);
    delete timers[identifier];

    setTodoData((prevData) => {
      const newTodoData = structuredClone(prevData);

      newTodoData.map((el) => {
        if (el.id === identifier) {
          el.paused = true;
        }
        return el;
      });

      saveToLocalStorage(newTodoData);

      return newTodoData;
    });
  };

  const addItem = (value, time) => {
    const newItem = {
      id: uuidv4(),
      completed: false,
      paused: false,
      value,
      time,
      date: new Date().toISOString(),
    };

    setTodoData((prevData) => {
      const newTodoData = [...prevData, newItem];

      saveToLocalStorage(newTodoData);

      return newTodoData;
    });
  };

  const deleteItem = (identifier) => {
    setTodoData((prevData) => {
      const newTodoData = prevData.filter(({ id }) => id !== identifier);

      saveToLocalStorage(newTodoData);

      return newTodoData;
    });
  };

  const editItem = (value, identifier) => {
    setTodoData((prevData) => {
      const newTodoData = structuredClone(prevData);

      newTodoData.map((el) => {
        if (el.id === identifier) {
          el.value = value;
        }
        return el;
      });

      saveToLocalStorage(newTodoData);

      return newTodoData;
    });
  };

  const clearCompleted = () => {
    setTodoData((prevData) => {
      const newTodoData = prevData.filter(({ completed }) => !completed);

      saveToLocalStorage(newTodoData);

      return newTodoData;
    });
  };

  useEffect(() => {
    let savedTodoData = localStorage.getItem('todoData');

    if (savedTodoData) {
      try {
        savedTodoData = JSON.parse(savedTodoData);
      } catch (e) {
        throw new Error(e.message);
      }

      setTodoData(savedTodoData);
    }
  }, []);

  useEffect(() => {
    todoData.forEach(({ completed, paused, id, time }) => {
      if (!completed && !paused && time) {
        setTaskTimer(id);
      }

      if (completed) {
        timerPause(id);
      }
    });
  });

  const visibleItem = addFilter(todoData, filter);

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <main className="main">
        <TaskList
          visibleItem={visibleItem}
          deleteItem={deleteItem}
          editItem={editItem}
          onToggleDone={onToggleDone}
          setTaskTimer={setTaskTimer}
          timerPause={timerPause}
        />
        <Footer
          todoData={todoData}
          clearCompleted={clearCompleted}
          setFilter={setFilter}
          filters={filters}
          filter={filter}
        />
      </main>
    </section>
  );
}
