import React from "react";

export default class TasksFilter extends React.Component {
  constructor(props) {
    super(props);
    this.buttons = [
      { name: "all", text: "All" },
      { name: "active", text: "Active" },
      { name: "completed", text: "Completed" },
    ];
  }

  render() {
    const { setFilter, filter } = this.props;

    const buttons = this.buttons.map((btn) => {
      return (
        <li key={btn.name}>
          <button
            className={filter === btn.name ? "selected" : null}
            onClick={() => setFilter(btn.name)}
          >
            {btn.text}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}
