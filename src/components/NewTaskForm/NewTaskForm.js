import React from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.state = {
      value: '',
    };
  }

  onValueChange(evt) {
    this.setState({
      value: evt.target.value,
    });
  }

  onSubmitForm(evt) {
    evt.preventDefault();

    const { addItem } = this.props;
    const { value } = this.state;

    addItem(value);

    this.setState({
      value: '',
    });
  }

  render() {
    const { value } = this.state;

    return (
      <form className="header" onSubmit={this.onSubmitForm}>
        <h1>todos</h1>
        <label>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onValueChange}
            value={value}
          />
        </label>
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  addItem: () => {},
};

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
};
