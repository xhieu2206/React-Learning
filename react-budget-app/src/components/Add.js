import React, { Component } from 'react';

class Add extends Component {
  constructor(props) {
    super(props);
    console.log('[Add.js] constructor');
    this.state = {
      type: 'inc'
    }
    this.valueInputRef = React.createRef();
  }

  submitHander = () => {
    this.descriptionInputRef.value = '';
    this.valueInputRef.current.value = '';
    if (this.state.value > 0 && this.state.description.trim() !== '') {
      this.props.add(this.state.type, this.state.description, this.state.value);
    }
  }

  render() {
    const classGenerator = (presetClassName, toggleClassName, enable) => {
      if (enable) {
        return `${presetClassName} ${toggleClassName}`
      }
      return presetClassName;
    };
    return (
      <div className="add">
        <div className="add__container">
          <select
            className={classGenerator("add__type", "red-focus", this.state.type !== 'inc')}
            value={this.state.type}
            onChange={(event) => { this.setState({ type: event.target.value }) }}>
              <option value="inc" defaultValue>+</option>
              <option value="exp">-</option>
          </select>
          <input
            onChange={(event) => { this.setState({ description: event.target.value }) }}
            ref={(descriptionInput) => {this.descriptionInputRef = descriptionInput}}
            type="text"
            className={classGenerator("add__description", "red-focus", this.state.type !== 'inc')}
            placeholder="Add description"
          />
          <input
            onChange={(event) => { this.setState({ value: event.target.value }) }}
            ref={this.valueInputRef}
            type="number"
            className={classGenerator("add__value", "red-focus", this.state.type !== 'inc')}
            placeholder="Value"
          />
          <button
            className={classGenerator("add__btn", "red", this.state.type !== 'inc')}
            onClick={this.submitHander}
          >
              <i className="ion-ios-checkmark-outline"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Add;
