import React from 'react';

import { formatNumber } from '../../../utils/stringUtil';

import DeleteItemContext from '../../../context/deleteItemContext';

const person = props => {
  const deleteItemContext = React.useContext(DeleteItemContext);

  return(
    <div className="item clearfix" id={props.item.id}>
        <div className="item__description">{props.item.description}</div>
        <div className="right clearfix">
            <div className="item__value">{formatNumber(props.item.value, 'inc')}</div>
            <div className="item__delete">
                <button
                  onClick={() => deleteItemContext.deleteItem(props.item.id, 'inc')}
                  className="item__delete--btn"><i className="ion-ios-close-outline"></i>
                </button>
            </div>
        </div>
    </div>
  )
}

export default person;
