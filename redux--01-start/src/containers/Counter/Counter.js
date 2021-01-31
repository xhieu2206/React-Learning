import React, { Component } from 'react';
import { connect } from 'react-redux'; // đây là 1 function, nhận vào 1 configuration object, và trả về một HOC sẽ nhận vào component được passed state từ store
import * as actionTypes from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} /> {/* ở đây chúng ta sẽ dùng props chứ không còn là state nữa. */}
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} /> {/* dùng action được dispatched. */}
                <CounterControl label="Decrement" clicked={this.props.onDecreasementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResult.map(item => (
                        <li
                            onClick={() => this.props.onDeleteResult(item.id)}
                            key={item.id}
                        >
                            {item.value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => { // configuration object
    return {
        ctr: state.ctr.counter,
        storedResult: state.res.result
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionTypes.increment()),
        onDecreasementCounter: () => dispatch(actionTypes.decreasement()),
        onAddCounter: () => dispatch(actionTypes.add(5)),
        onSubtractCounter: () => dispatch(actionTypes.subtract(5)),
        onStoreResult: (counter) => dispatch(actionTypes.storeDefault(counter)),
        onDeleteResult: (id) => dispatch(actionTypes.deleteResult(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter); // second arg chính là actions là chúng ta muốn dispatch từ component này
