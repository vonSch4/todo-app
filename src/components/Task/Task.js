import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmitEdit = this.onSubmitEdit.bind(this);
    const { value } = this.props;
    this.state = {
      editing: false,
      value,
    };
  }

  onValueChange(evt) {
    this.setState(() => {
      return {
        value: evt.target.value,
      };
    });
  }

  onSubmitEdit(evt) {
    const { value } = this.state;
    const { id, editItem } = this.props;

    evt.preventDefault();
    if (!value) return;

    editItem(value, id);

    this.setState({
      editing: false,
    });
  }

  render() {
    const { id, date, completed, deleteItem, onToggleDone } = this.props;
    const { editing, value } = this.state;

    const liClassName = classNames({ completed, editing });
    const formEdit = (
      <form onSubmit={this.onSubmitEdit}>
        <input
          type="text"
          className="edit"
          onChange={this.onValueChange}
          value={value}
        />
      </form>
    );

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
            type="button"
            aria-label="Edit"
            className="icon icon-edit"
            onClick={() => this.setState({ editing: true })}
          />
          <button
            type="button"
            aria-label="Delete"
            className="icon icon-destroy"
            onClick={() => deleteItem(id)}
          />
        </div>
        {editing && formEdit}
      </li>
    );
  }
}

Task.defaultProps = {
  completed: false,
  deleteItem: () => {},
  editItem: () => {},
  onToggleDone: () => {},
};

Task.propTypes = {
  completed: PropTypes.bool,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  onToggleDone: PropTypes.func,
};
