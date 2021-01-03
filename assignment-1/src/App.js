import React, { Component } from 'react';
import './App.css';

import UserOutput from './UserOutput/UserOutput';

class App extends Component {
  state = {
    items: [
      { username: 'Hiếu', email: 'xhieu94@gmail.com' },
      { username: 'Max', email: 'max@gmail.com' }
    ]
  }

  render() {
    return (
      <div className="App">
        <h1>1st Assignment</h1>
        <hr></hr>
        <UserOutput
          username={this.state.items[0].username}
          email={this.state.items[0].email}/>
        <hr></hr>
        <UserOutput
          username={this.state.items[1].username}
          email={this.state.items[1].email}>
        </UserOutput>
      </div>
    );
  }
}

export default App;
