import React from 'react';

const input = props => {
  return (
    <fieldset className="form-group">
      <input
        className="form-control form-control-lg"
        type={props.type} placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.changed(e)}
      />
    </fieldset>
  );
}

export default input;
