import React, { Component } from 'react';

import classesStyles from './App.css';

import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    /* Chúng ta có thể init state ở đây
    this.state = {
      persons: [
        { id: 'adad1', name: 'Xuân Hiếu', age: 26 },
        { id: 'aeae2', name: 'Max', age: 30 },
        { id: 'atat3', name: 'Quân', age: 31 },
      ],
      otherState: 'Some other state',
      showPersons: false
    }
    */
  }

  state = {
    persons: [
      { id: 'adad1', name: 'Xuân Hiếu', age: 26 },
      { id: 'aeae2', name: 'Max', age: 30 },
      { id: 'atat3', name: 'Quân', age: 31 },
    ],
    otherState: 'Some other state',
    showPersons: false,
    showCockpit: true
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  /*
  componentWillMount() { // sẽ bị bỏ đi trong tương lai, không nên sử dụng
    console.log('[App.js] componentWillMount');
  }
  */

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) { // phải return true hoặc false
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
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
    console.log('[App.js] render');

    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}
      />
    }

    return (
      <div className={classesStyles.App}>
        <button onClick={
          () => {
            console.log('VAO DAY')
            this.setState(
              { showCockpit: !this.state.showCockpit }
            )}
          }>
            Toggle Cockpit
        </button>

        {this.state.showCockpit ? <Cockpit
          title={this.props.appTitle} // Ở đây chúng ta dùng this.props vì đây là class-based component
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler}
        /> : null}

        {persons}
      </div>
    );
  }
}

export default App; // higher order component, có thể coi như là một component wrapping lấy một component khác, có thể dùng ở cả class-based component hay functional component
