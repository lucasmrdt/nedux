import { createStore, Middleware } from 'nedux';

const createLoggerMiddleware = <T, K extends keyof T>(
  keys: K[],
): Middleware<T, K> => store => {
  keys.forEach(key =>
    store.subscribe(key as any, {
      next: newValue =>
        console.log(`value of ${key} has changed by ${newValue}`),
    }),
  );
};

const store = createStore(
  {
    a: 0,
    b: 'b',
  },
  [createLoggerMiddleware(['a'])],
);

store.set('b', 'a');
store.set('a', 1);
store.set('a', a => a * 2);
store.set('b', 'not b');
