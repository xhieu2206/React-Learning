import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'adad1', name: 'Xuân Hiếu', age: 26 },
      { id: 'aeae2', name: 'Max', age: 30 },
      { id: 'atat3', name: 'Quân', age: 31 },
    ],
    otherState: 'Some other state',
    showPersons: false
  }

  deletePersonHandler = index => {
    const persons = this.state.persons.slice(); // const persons = [...this.state.persons]
    persons.splice(index, 1);
    this.setState({
      persons: persons
    })
  }

  nameChangedHandler = (event, id) => { // event sẽ được passed một các tự động bởi React như là normal js
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = {...this.state.persons[personIndex]};
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person
    this.setState({
      persons: persons
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

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              name={person.name}
              age={person.age}
              clickName={() => this.deletePersonHandler(index)} // có thể dùng bind, phải cùng tên với tên attribute của Person component
              key={person.id}
              changeName={(event) => this.nameChangedHandler(event, person.id)} // phải cùng tên với tên attribute của Person component
            />
          })}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Hello Xuân Hiếu</h1>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>
            Toggle
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
