import React from 'react';

const errorMessages = props => (
  <ul className="error-messages">
    {props.errors.map(error => <li key={error.replace(' ', '')}>{error}</li>)}
  </ul>
)

export default errorMessages;
