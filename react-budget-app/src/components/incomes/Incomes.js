import React from 'react';

import withClass from '../../hoc/withClass';
import Auxiliary from '../../hoc/Auxiliary';

import Income from './Income/Income.js';

class Incomes extends React.Component {
  render() {
    return(
      <Auxiliary>
        <h2 className="icome__title">Income</h2>
        <div className="income__list">
          {this.props.items.map(item => {
            return <Income key={item.id} item={item} />
          })}
        </div>
      </Auxiliary>
    )
  }
}

export default withClass(Incomes, 'income');
