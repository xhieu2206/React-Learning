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
    otherState: 'Some other state',
    showPersons: false
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

  nameChangedHandler = event => { // event sẽ được passed một các tự động bởi React như là normal js
    this.setState({
      persons: [
        { name: 'Xuân Hiếu', age: 26 },
        { name: event.target.value, age: 30 },
        { name: 'Quân', age: 31 },
      ]
    });
  }

  togglePersonsHandler = () => { // luôn dùng syntax này nếu như chúng ta có ý định sử dụng THIS keyword
    this.setState({
      showPersons: !this.state.showPersons // toggle giá trị của showPersons
    })
  }

  // () => this.switchNameHandler() sẽ là () => { return this.switchNameHandler() }, return ra một function call
  render() {
    // không dùng được một số style như cursor trong inline CSS như thế này.
    // style này sẽ được applied với scope là chỉ component này thôi.
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>Hello Xuân Hiếu</h1>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>
            Toggle
        </button>
        { this.state.showPersons ?
          <div>
            <Person
              name={this.state.persons[0].name}
              age={this.state.persons[0].age} 
            />
            <Person
              name={this.state.persons[1].name}
              age={this.state.persons[1].age}
              clickName={this.switchNameHandler.bind(this, 'Maximilian')}
              changeName={this.nameChangedHandler}>
                My hobbies: Racing
            </Person>
            <Person
              name={this.state.persons[2].name}
              age={this.state.persons[2].age} >
            </Person>
          </div> : null
        }
      </div>
    );
  }
}

export default App;
