import React, { Component } from 'react';

import Person from './Person/Person';

class Persons extends Component { // convert thành class-based component để sử dụng lifecycle hook
  /*
  static getDerivedStateFromProps(props, state) { // rất ít khi sử dụng
    console.log('[Persons.js] getDerivedStateFromProps');
    return state;
  }
  */

  shouldComponentUpdate(nextProps, nextState) { // bắt buộc phải return true hoặc false, không return gì không phải là 1 option
    console.log('[Persons.js] shouldComponentUpdate');
    if (nextProps.persons !== this.props.persons) { // chỉ có thể compare đúng nếu như chúng ta thực sự created 1 copy của persons như chúng ta đã làm
      return true;
    }
    return false;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return { message: 'Snapshot!!!' }; // sẽ có waring nếu chúng ta không return gì.
  }

  componentDidUpdate(prevProps, prevState, snapshot) { // snapshot ở đây chính là return từ getSnapshotBeforeUpdate
    console.log('[Persons.js] componentDidUpdate');
    console.log('Snapshot: ', snapshot);
  }

  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
  }

  render() {
    console.log('[Persons.js] rendering ...');
    return(
      this.props.persons.map((person, index) => {
        return <Person
          name={person.name}
          age={person.age}
          key={person.id}
          clickName={() => this.props.clicked(index)}
          changeName={(event) => this.props.changed(event, person.id)}
        />
      })
    )
  }
}

export default Persons;
