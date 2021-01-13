import React from 'react';

const productRow = props => {
  const style = {
    color: props.stocked ? 'red' : 'black'
  }

  const wordCapitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <tr>
      <td style={style}>{wordCapitalize(props.name)}</td>
      <td>{props.price}</td>
    </tr>
  )
}

export default productRow;
