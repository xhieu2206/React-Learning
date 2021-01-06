import React, { Component } from 'react';

import styledClasses from './Person.css';

class Person extends Component { // convert thành class-based component để sử dụng lifecycle hook
  render() {
    console.log('[Person.js] rendering ...');
    return (
      <div className={styledClasses.Person}>
        <p
          onClick={this.props.clickName}>
            I'm a {this.props.name} and I'm {this.props.age} years old
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changeName}
          value={this.props.name}/>
      </div>
    )
  }
  // đối với class-based components, chúng ta sẽ dùng this.props trong JSX code để get value của các attribute này.
}

export default Person;
