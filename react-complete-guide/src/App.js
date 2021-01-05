import React, { Component } from 'react';

import classesStyles from './App.css';
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
    });
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
    /*
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': { // sau tất cả, đây sẽ được convert thành JS, có thể coi ':hover' ở đây là một property
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }
    */

    let persons = null;
    let btnClass = [classesStyles.Button];

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

      btnClass.push(classesStyles.Red);

      /*
      style.backgroundColor = 'red';
      style[':hover'] = { // sau tất cả, đây sẽ được convert thành JS, có thể coi ':hover' ở đây là một property
        backgroundColor: 'salmon',
        color: 'black'
      }
      */
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(classesStyles.red); // red
    }
    if (this.state.persons.length <= 1) {
      classes.push(classesStyles.bold); // red & bold
    }

    return (
      <div className={classesStyles.App}>
        <h1>Hello</h1>
        <p className={classes.join(' ')}>It worked</p>
        <button
          className={btnClass.join(' ')}
          onClick={this.togglePersonsHandler}
        >
          Toggle
        </button>
        {persons}
      </div>
    );
  }
}

export default App; // higher order component, có thể coi như là một component wrapping lấy một component khác, có thể dùng ở cả class-based component hay functional component
