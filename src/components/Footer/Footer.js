import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

export default function Footer(props) {
  const { todoData, clearCompleted, setFilter, filter } = props;

  const completedCount = todoData.filter(({ completed }) => !completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">{completedCount} items left</span>
      <TasksFilter setFilter={setFilter} filter={filter} />
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  filter: 'all',
  clearCompleted: () => {},
  setFilter: () => {},
};

Footer.propTypes = {
  filter: PropTypes.string,
  clearCompleted: PropTypes.func,
  setFilter: PropTypes.func,
};
