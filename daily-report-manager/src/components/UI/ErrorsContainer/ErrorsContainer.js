import React from 'react';

const ErrorsContainer = props => {
  return (
    <ul>
      {props.errors.forEach((error, index) => {
        return <li key={index}>{error}</li>
      })}
    </ul>
  )
}

export default ErrorsContainer;
