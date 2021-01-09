import React from 'react';

import { formatNumber } from '../utils/stringUtil';

const availableBudget = props => {
  return(
    <div className="budget__value">{props.budget > 0 ? formatNumber(props.budget, 'inc') : props.budget < 0 ? formatNumber(props.budget, 'exp') : '+ 0.00'}</div>
  );
}

export default availableBudget;
