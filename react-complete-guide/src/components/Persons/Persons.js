import React, { PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent { // convert thành class-based component để sử dụng lifecycle hook
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
    return this.props.persons.map((person, index) => {
      return <Person
        name={person.name}
        age={person.age}
        key={person.id}
        clickName={() => this.props.clicked(index)}
        changeName={(event) => this.props.changed(event, person.id)}
      />
    })
  }
}

export default Persons;
