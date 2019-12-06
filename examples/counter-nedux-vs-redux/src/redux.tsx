import React, { useCallback } from 'react';
import { createStore, Action, Dispatch } from 'redux';
import { connect, Provider } from 'react-redux';

enum ActionType {
  INCREMENT,
  DECREMENT,
}

const increment: Action = { type: ActionType.INCREMENT };
const decrement: Action = { type: ActionType.DECREMENT };

type State = {
  counter: number;
};

const reducer = (state: State = { counter: 0 }, action: any): State => {
  switch (action.type as ActionType) {
    case ActionType.INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case ActionType.DECREMENT:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

export const store = createStore(reducer);

type StateProps = {
  counter: number;
};

type DispatchProps = {
  increment: () => void;
  decrement: () => void;
};

let timer = 0;

const ReduxCounter = ({
  increment,
  decrement,
  counter,
}: StateProps & DispatchProps) => {
  const onIncrement = useCallback(() => {
    timer = Date.now();
    increment();
  }, [increment]);

  const onDecrement = useCallback(() => {
    timer = Date.now();
    decrement();
  }, [decrement]);

  return (
    <span>
      <p>you've clicked {counter} times</p>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      {timer && <p>render time {(Date.now() - timer) / 1000}s</p>}
    </span>
  );
};

const mapStateToProps = (state: State): StateProps => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  decrement: () => dispatch(decrement),
  increment: () => dispatch(increment),
});

const ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxCounter);

type Props = {
  nb: number;
};

const Redux = ({ nb }: Props) => (
  <Provider store={store}>
    <div style={{ width: '50%' }}>
      <h1>redux counter</h1>
      {[...Array(nb)].map((_, i) => (
        <ConnectedCounter key={`${i}`} />
      ))}
    </div>
  </Provider>
);

export default Redux;
