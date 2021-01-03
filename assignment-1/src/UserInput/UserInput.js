import React from 'react';

const userInput = (props) => {
  const style = {
    borderRadius: '5px',
    padding: '5px'
  }

  return <input
      type="text"
      style={style}
      placeholder="Enter new username"
      onChange={props.changeName}
      value={props.username} />
}

export default userInput;
