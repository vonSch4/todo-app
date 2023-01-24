import React from 'react';
import PropTypes from 'prop-types';

export default class TasksFilter extends React.Component {
  constructor(props) {
    super(props);
    this.buttons = [
      { name: 'all', text: 'All' },
      { name: 'active', text: 'Active' },
      { name: 'completed', text: 'Completed' },
    ];
  }

  render() {
    const { setFilter, filter } = this.props;

    const buttons = this.buttons.map((btn) => (
      <li key={btn.name}>
        <button
          type="button"
          className={filter === btn.name ? 'selected' : null}
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
