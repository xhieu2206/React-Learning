import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Xuân Hiếu', age: 26 },
      { name: 'Max', age: 30 },
      { name: 'Quân', age: 31 },
    ]
  }
  render() {
    return (
      <div className="App">
        <h1>Hello Xuân Hiếu</h1>
        <button>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} >My hobbies: Racing</Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age} ></Person>
      </div>
    );
  }
}

export default App;
