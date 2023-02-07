import PropTypes from 'prop-types';

import Task from '../Task';

export default function TaskList(props) {
  const {
    visibleItem,
    deleteItem,
    editItem,
    onToggleDone,
    setTaskTimer,
    timerPause,
  } = props;

  const listItem = visibleItem.map((item) => {
    const { id } = item;
    return (
      <Task
        key={id}
        {...item}
        deleteItem={deleteItem}
        editItem={editItem}
        onToggleDone={onToggleDone}
        setTaskTimer={setTaskTimer}
        timerPause={timerPause}
      />
    );
  });

  if (visibleItem.length === 0) {
    return <div className="empty-list">The task list is empty</div>;
  }

  return <ul className="todo-list">{listItem}</ul>;
}

TaskList.defaultProps = {
  visibleItem: [],
  deleteItem: () => {},
  editItem: () => {},
  onToggleDone: () => {},
  timerPause: () => {},
  setTaskTimer: () => {},
};

TaskList.propTypes = {
  visibleItem: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      completed: PropTypes.bool,
      paused: PropTypes.bool,
      value: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  onToggleDone: PropTypes.func,
  timerPause: PropTypes.func,
  setTaskTimer: PropTypes.func,
};
