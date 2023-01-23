import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import parseISO from "date-fns/parseISO";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    this.state = {
      editing: false,
      value: this.props.value,
    };
  }

  onValueChange(evt) {
    this.setState({
      value: evt.target.value,
    });
  }

  onSubmitEdit(evt) {
    evt.preventDefault();
    if (!this.state.value) return;

    this.props.editItem(this.state.value, this.props.id);

    this.setState({
      editing: false,
    });
  }

  render() {
    const { id, date, completed, deleteItem, onToggleDone } = this.props;
    const { editing, value } = this.state;

    let liClassName;
    let formEdit;

    if (completed) {
      liClassName = "completed";
    } else if (editing) {
      liClassName = "editing";
      formEdit = (
        <form onSubmit={this.onSubmitEdit}>
          <input
            type="text"
            className="edit"
            autoFocus
            onChange={this.onValueChange}
            value={value}
          ></input>
        </form>
      );
    }

    return (
      <li className={liClassName}>
        <div className="view">
          <input
            className="toggle"
            id={id}
            type="checkbox"
            checked={completed}
            onChange={() => onToggleDone(id)}
          />
          <label htmlFor={id}>
            <span className="description">{value}</span>
            <span className="created">
              {formatDistanceToNow(parseISO(date), {
                addSuffix: true,
              })}
            </span>
          </label>
          <button
            className="icon icon-edit"
            onClick={() => this.setState({ editing: true })}
          ></button>
          <button
            className="icon icon-destroy"
            onClick={() => deleteItem(id)}
          ></button>
        </div>
        {formEdit}
      </li>
    );
  }
}
