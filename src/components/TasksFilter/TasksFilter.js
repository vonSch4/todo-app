import React from 'react';
import PropTypes from 'prop-types';

export default function TasksFilter(props) {
  const { setFilter, filter, filters } = props;
  const {
    all: allFilter,
    active: activeFilter,
    completed: completedFilter,
  } = filters;

  const buttons = [
    { name: allFilter, text: 'All' },
    { name: activeFilter, text: 'Active' },
    { name: completedFilter, text: 'Completed' },
  ];

  const filterButtons = buttons.map((btn) => (
    <li key={btn.name}>
      <button
        type="button"
        className={filter === btn.name ? 'selected' : ''}
        onClick={() => setFilter(btn.name)}
      >
        {btn.text}
      </button>
    </li>
  ));

  return <ul className="filters">{filterButtons}</ul>;
}

TasksFilter.defaultProps = {
  filter: 'all',
  setFilter: () => {},
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};
