import React from 'react';

const scaleNames  = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

const temperatureInput = props => {
  const temperratureConvert = (temperature, scaleNames) => {
    if (scaleNames === 'c') return temperature;
    return (temperature * 9 / 5) + 32;
  }

  return (
    <fieldset>
      <legend>
        Enter temperature in {scaleNames[props.scale]}:
      </legend>
      <input
        type="number"
        value={temperratureConvert(props.temperature, props.scale)}
        onChange={(e) => props.changed(props.scale, e)}
      />
    </fieldset>
  );
}

export default temperatureInput;
