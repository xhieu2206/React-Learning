import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Xuân Hiếu', age: 26 },
      { name: 'Max', age: 30 },
      { name: 'Quân', age: 31 },
    ],
    otherState: 'Some other state'
  }

  switchNameHandler = (newName) => { // arrow function để lexical con trỏ this
    // DONT DO THIS: this.state.persons[0].name = 'Nguyễn Xuân Hiếu'; // React sẽ không render lại DOM nó "không biết" rằng chúng ta đã thay đổi state của component
    this.setState({
      persons: [
        { name: newName, age: 26 },
        { name: 'Max', age: 30 },
        { name: 'Quân', age: 31 },
      ]
    })
  }

  // () => this.switchNameHandler() sẽ là () => { return this.switchNameHandler() }, return ra một function call
  render() {
    return (
      <div className="App">
        <h1>Hello Xuân Hiếu</h1>
        <button onClick={() => this.switchNameHandler('Nguyễn Xuân Hiếu')}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age} 
        />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          clickName={this.switchNameHandler.bind(this, 'Maximilian')}>
            My hobbies: Racing
        </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age} >
        </Person>
      </div>
    );
  }
}

export default App;
