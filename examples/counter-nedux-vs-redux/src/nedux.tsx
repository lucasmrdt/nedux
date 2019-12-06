import React, { useCallback } from 'react';
import { createStore } from 'nedux';
import { createStoreHook } from 'react-nedux';

type Store = {
  counter: number;
};

const store = createStore<Store>({
  counter: 0,
});

const useStore = createStoreHook<Store>(store);

let timer = 0;

const NeduxCounter = () => {
  const [counter, setCounter] = useStore('counter');

  const increment = useCallback(() => {
    timer = Date.now();
    setCounter(prev => prev + 1);
  }, [setCounter]);
  const decrement = useCallback(() => {
    timer = Date.now();
    setCounter(prev => prev - 1);
  }, [setCounter]);

  return (
    <span>
      <p>you've clicked {counter} times</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      {timer && <p>render time {(Date.now() - timer) / 1000}s</p>}
    </span>
  );
};

type Props = {
  nb: number;
};

const Nedux = ({ nb }: Props) => (
  <div style={{ width: '50%' }}>
    <h1>nedux counter</h1>
    {[...Array(nb)].map((_, i) => (
      <NeduxCounter key={`${i}`} />
    ))}
  </div>
);

export default Nedux;
