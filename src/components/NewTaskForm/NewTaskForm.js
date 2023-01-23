import React from "react";

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.state = {
      value: "",
    };
  }

  onValueChange(evt) {
    this.setState({
      value: evt.target.value,
    });
  }

  onSubmitForm(evt) {
    evt.preventDefault();
    this.props.addItem(this.state.value);
    this.setState({
      value: "",
    });
  }

  render() {
    return (
      <form className="header" onSubmit={this.onSubmitForm}>
        <h1>todos</h1>
        <label>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.onValueChange}
            value={this.state.value}
          />
        </label>
      </form>
    );
  }
}
