import React, { Component } from 'react';
import './Char.css';

export default class Char extends Component {
  render() {
    return(
      <div
        className='char'
        onClick={this.props.removeChar}>
          {this.props.char}
      </div>
    )
  }
}
