import React from 'react';

import { formatNumber } from '../utils/stringUtil';

const totalIncome = props => {
  return(
    <div className="budget__income clearfix">
      <div className="budget__income--text">Income</div>
      <div className="right">
        <div className="budget__income--value">{props.value > 0 ? `${formatNumber(props.value, 'inc')}` : '+ 0.00'}</div>
        <div className="budget__income--percentage">&nbsp;</div>
      </div>
    </div>
  )
}

export default totalIncome;
