import React from 'react';

import { formatNumber } from '../utils/stringUtil';

const totalExpense = props => {
  return(
    <div className="budget__expenses clearfix">
      <div className="budget__expenses--text">Expenses</div>
      <div className="right clearfix">
        <div className="budget__expenses--value">{props.value > 0 ? `${formatNumber(props.value)}` : '- 0.00'}</div>
        <div className="budget__expenses--percentage">{props.percentage === -1 ? '---' : `${props.percentage} %`}</div>
      </div>
    </div>
  );
}

export default totalExpense;
