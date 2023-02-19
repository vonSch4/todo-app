import React, { useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Task(props) {
  const {
    id,
    date,
    completed,
    value,
    deleteItem,
    editItem,
    onToggleDone,
    time,
    timerPause,
    setTaskTimer,
  } = props;

  const [editing, setEditing] = useState(false);
  const [taskValue, setTaskValue] = useState(value);

  const onValueChange = (evt) => setTaskValue(evt.target.value);

  const onSubmitEdit = (evt) => {
    evt.preventDefault();

    if (!taskValue) return;

    editItem(taskValue, id);

    setEditing(false);
  };

  const liClassName = classNames({ completed, editing });
  const formEdit = (
    <form onSubmit={onSubmitEdit}>
      <input
        type="text"
        className="edit"
        onChange={onValueChange}
        value={taskValue}
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
          onClick={() => setEditing(true)}
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
