import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function NewTaskForm(props) {
  const { addItem } = props;

  const [value, setValue] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onSubmitForm = (evt) => {
    evt.preventDefault();

    if (value && min && sec) {
      if (min < 0 || min > 100 || sec < 0 || sec > 59) return;
      if (Number.isNaN(+min) || Number.isNaN(+sec)) return;

      addItem(value, +min * 60 + +sec);

      setValue('');
      setMin('');
      setSec('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmitForm}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={(evt) => setValue(evt.target.value)}
          value={value}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={(evt) => setMin(evt.target.value)}
          value={min}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={(evt) => setSec(evt.target.value)}
          value={sec}
        />
        <button type="submit" value="Отправить" />
      </form>
    </header>
  );
}

NewTaskForm.defaultProps = {
  addItem: () => {},
};

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
};
