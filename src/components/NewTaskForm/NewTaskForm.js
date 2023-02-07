import React from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.state = {
      value: '',
      min: '',
      sec: '',
    };
  }

  onValueChange(evt, value) {
    this.setState({
      [value]: evt.target.value,
    });
  }

  onSubmitForm(evt) {
    evt.preventDefault();

    const { addItem } = this.props;
    const { value, min, sec } = this.state;

    if (value && min && sec) {
      if (min < 0 || min > 100 || sec < 0 || sec > 59) return;
      if (Number.isNaN(+min) || Number.isNaN(+sec)) return;

      addItem(value, +min * 60 + +sec);

      this.setState({
        value: '',
        min: '',
        sec: '',
      });
    }
  }

  render() {
    const { value, min, sec } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmitForm}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(evt) => this.onValueChange(evt, 'value')}
            value={value}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={(evt) => this.onValueChange(evt, 'min')}
            value={min}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={(evt) => this.onValueChange(evt, 'sec')}
            value={sec}
          />
          <button type="submit" value="Отправить" />
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {},
};

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
};
