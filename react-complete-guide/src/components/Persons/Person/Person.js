import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import styledClasses from './Person.css';
import classesStyles from './Person.css';

import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';

class Person extends Component { // convert thành class-based component để sử dụng lifecycle hook
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
    console.log(this.context.authenticated);
  }

  render() {
    console.log('[Person.js] rendering ...');
    return (
      <Auxiliary>
          {this.context.authenticated ? <p>Authenticated!!!</p> : <p>Please login!!!</p>}
          <p
            onClick={this.props.clickName}>
              I'm a {this.props.name} and I'm {this.props.age} years old
          </p>,
          <p>{this.props.children}</p>,
          <input
            // ref={(inputEle) => {this.inputElement = inputEle}} // cách 1
            ref={this.inputElementRef}
            type="text"
            onChange={this.props.changeName}
            value={this.props.name}
          />
      </Auxiliary>
    )
  }
  // đối với class-based components, chúng ta sẽ dùng this.props trong JSX code để get value của các attribute này.
}

Person.propTypes = {
  clickName: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changeName: PropTypes.func
};

export default withClass(Person, classesStyles.Person);
