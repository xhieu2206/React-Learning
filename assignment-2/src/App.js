import React, { Component } from 'react';
import './App.css';

import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  state = {
    text: ''
  }

  changeTextHandler = event => {
    this.setState({
      text: event.target.value
    });
  }

  removeCharHandler = index => {
    let newText = this.state.text.slice(0, index) + this.state.text.slice(index + 1);
    this.setState({
      text: newText
    })
  }

  render() {
    const formStyle = {
      marginTop: '5px',
      marginBotton: '5px'
    }

    let chars = null;

    if (this.state.text.length > 0) {
      chars = (
        <div>
          {this.state.text.split('').map((c, index) => {
            return <Char
              char={c}
              key={index}
              removeChar={() => this.removeCharHandler(index)}
            />
          })}
        </div>
      )
    }

    return (
      <div className="App">
        <h1 className="App-title">2nd Assignment</h1>
        <div style={formStyle}>
          <label>Length of paragraph: </label>
          <input
            value={this.state.text.length}
            readOnly
          />
        </div>
        <div style={formStyle}>
          <label>Paragraph content: </label>
          <input
            onChange={e => this.changeTextHandler(e)}
            value={this.state.text}
          />
        </div>
        <Validation length={this.state.text.length} />
        {chars}
      </div>
    );
  }
}

export default App;
