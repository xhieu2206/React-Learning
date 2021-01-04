import React from 'react';

const validation = props => {
  return(
    <div>
      <p className={props.length > 5 ? 'green' : 'red'}>
        {props.length > 5 ? 'Text long enough' : 'Text too short'}
      </p>
    </div>
  )
}

export default validation;
