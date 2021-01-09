import React from 'react';

import withClass from '../../hoc/withClass';
import Auxiliary from '../../hoc/Auxiliary';

import Expense from './Expense/Expense.js';

class Expenses extends React.Component {
  render() {
    return(
      <Auxiliary>
        <h2 className="expenses__title">Expenses</h2>
        <div className="expenses__list">
          {this.props.items.map(item => {
            return <Expense key={item.id} item={item} />
          })}
        </div>
      </Auxiliary>
    )
  }
}

export default withClass(Expenses, 'expenses');
