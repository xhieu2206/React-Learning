import React from "react";

const textarea = (props) => {
  return (
    <fieldset className="form-group">
      <textarea
        className="form-control"
        rows="8"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.changed(e)}
      />
    </fieldset>
  );
};

export default textarea;
