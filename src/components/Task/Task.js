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
    const {
      id,
      date,
      completed,
      deleteItem,
      onToggleDone,
      time,
      timerPause,
      setTaskTimer,
    } = this.props;

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

    const sec = time % 60 > 9 ? time % 60 : `0${time % 60}`;
    const min = Math.trunc(time / 60);

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
            <span className="title">{value}</span>
            <span className="description">
              <button
                type="button"
                className="icon icon-play"
                onClick={() => setTaskTimer(id)}
              />
              <button
                type="button"
                className="icon icon-pause"
                onClick={() => timerPause(id)}
              />
              {` ${min}:${sec}`}
            </span>
            <span className="description">
              {'created '}
              {formatDistanceToNow(parseISO(date), {
                addSuffix: true,
                includeSeconds: true,
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
            onClick={() => {
              deleteItem(id);
              timerPause(id);
            }}
          />
        </div>
        {editing && formEdit}
      </li>
    );
  }
}

Task.defaultProps = {
  completed: false,
  time: 0,
  deleteItem: () => {},
  editItem: () => {},
  onToggleDone: () => {},
  timerPause: () => {},
  setTaskTimer: () => {},
};

Task.propTypes = {
  completed: PropTypes.bool,
  time: PropTypes.number,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  onToggleDone: PropTypes.func,
  timerPause: PropTypes.func,
  setTaskTimer: PropTypes.func,
};
