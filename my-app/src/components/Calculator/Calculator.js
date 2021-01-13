import React from 'react';

import BoilingVerdict from './BoilingVerdict/BoilingVerdict';
import TemperatureInput from './TemperatureInput/TemperatureInput';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 20
    }

    this.enterTemperatureHandler = this.enterTemperatureHandler.bind(this);
  }

  toCelsius(temperature, scale) {
    if (scale === 'c') return temperature;
    return (temperature - 32) * 5 / 9;
  }

  enterTemperatureHandler(scale, e) {
    const celValue = this.toCelsius(e.target.value, scale);

    this.setState({
      temperature: celValue
    });
  }

  render() {
    return(
      <div>
        <TemperatureInput
          scale='c'
          temperature={this.state.temperature}
          changed={(scale, e) => this.enterTemperatureHandler(scale, e)}
        />
        <TemperatureInput
          scale='f'
          temperature={this.state.temperature}
          changed={(scale, e) => this.enterTemperatureHandler(scale, e)}
        />
        <BoilingVerdict
          celsius={parseFloat(this.state.temperature)}
        />
      </div>
    )
  }
}

export default Calculator;
