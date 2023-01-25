import React from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends React.Component {
  allFilter = this.props.filters.all;

  activeFilter = this.props.filters.active;

  completedFilter = this.props.filters.completed;

  constructor(props) {
    super(props);
    this.buttons = [
      { name: this.allFilter, text: 'All' },
      { name: this.activeFilter, text: 'Active' },
      { name: this.completedFilter, text: 'Completed' },
    ];
  }

  render() {
    const { setFilter, filter } = this.props;

    const buttons = this.buttons.map((btn) => (
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

    return <ul className="filters">{buttons}</ul>;
  }
}

TasksFilter.defaultProps = {
  filter: 'all',
  setFilter: () => {},
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};
