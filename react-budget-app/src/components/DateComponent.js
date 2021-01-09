import React from 'react';

import { MONTHS } from '../constants/Date';

const dateComponent = () => {
  return (
    <div className="budget__title">
        Available Budget in <span className="budget__title--month">{MONTHS[(new Date()).getMonth()]} {(new Date()).getFullYear()}</span>:
    </div>
  )
}

export default dateComponent;
