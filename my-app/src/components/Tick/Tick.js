import React from 'react';

import Clock from './Clock/Clock';

class Tick extends React.Component {
  state = {
    date: new Date()
  }

  componentDidMount() {
    console.log('[Tick.js] componentDidMount');
    this.timerId = setInterval(() => {
      const date = new Date();
      this.setState({
        date: date
      });
    }, 1000);
  }

  componentWillUnmount() {
    console.log('[Tick.js] componentWillUnmount');
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div>
        <Clock date={this.state.date} />
      </div>
    );
  }
}

export default Tick;
