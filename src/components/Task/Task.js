import React from "react";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
    };
    this.onValueClick = this.onValueClick.bind(this);
  }

  onValueClick() {
    this.setState(({ completed }) => {
      return {
        completed: !completed,
      };
    });
  }

  render() {
    const { editing, value, date, onClickDelete } = this.props;
    const { completed } = this.state;

    let liClassName;
    let inputEditing;

    if (completed) {
      liClassName = "completed";
    } else if (editing) {
      liClassName = "editing";
      inputEditing = (
        <input type="text" className="edit" defaultValue={value}></input>
      );
    }

    return (
      <li className={liClassName}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={this.onValueClick}
          />
          <label>
            <span className="description">{value}</span>
            <span className="created">{date}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button
            className="icon icon-destroy"
            onClick={onClickDelete}
          ></button>
        </div>
        {inputEditing}
      </li>
    );
  }
}
