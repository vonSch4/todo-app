import PropTypes from 'prop-types';

import Task from '../Task';

export default function TaskList(props) {
  const { todoData, deleteItem, editItem, onToggleDone } = props;

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

TaskList.defaultProps = {
  todoData: [],
  deleteItem: () => {},
  editItem: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      completed: PropTypes.bool,
      value: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  onToggleDone: PropTypes.func,
};
