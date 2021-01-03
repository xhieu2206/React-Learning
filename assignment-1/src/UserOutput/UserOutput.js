import React, { Component } from 'react';

import UserInput from '../UserInput/UserInput';
import './UserOutput.css';

class UserOutput extends Component {
  state = {
    item: {
      username: this.props.username,
      email: this.props.email
    },
    defaultValue: {
      username: this.props.username,
      email: this.props.email
    }
  }

  changeUsernameHandler = event => {
    this.setState({
      item: {
        username: event.target.value,
        email: this.props.email
      }
    })
  }

  resetDefaultValue = () => {
    this.setState({
      item: {
        username: this.state.defaultValue.username,
        email: this.state.defaultValue.email
      }
    });
  }

  clearInputHander = () => {
    this.setState({
      item: {
        username: '',
        email: this.props.email
      }
    })
  }

  render() {
    return (
      <div className="userOutput">
        <button
          className="green"
          onClick={this.clearInputHander}>
            Clear username input
        </button>
        <button
          className="blue"
          onClick={this.resetDefaultValue}>
          Reset default username value
        </button>
        <p>Username: {this.state.item.username}</p>
        <p>Email: {this.state.item.email}</p>

        <UserInput
          username={this.state.item.username}
          changeName={this.changeUsernameHandler}
          >
        </UserInput>
      </div>
    )
  }
}

export default UserOutput;
