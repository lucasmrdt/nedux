import { BehaviorSubject, PartialObserver, Subscription } from 'rxjs';

type DefaultState = { [key: string]: any };

export interface Store<
  T extends DefaultState = DefaultState,
  K extends keyof T = keyof T
> {
  get: <Key extends K, Value extends T[K] = T[Key]>(key: Key) => Value;
  set: <Key extends K, Value extends T[K] = T[Key]>(
    key: Key,
    value: Value | ((prevValue: Value) => Value),
  ) => void;
  subscribe: <Key extends K, Value extends T[K] = T[Key]>(
    key: Key | '',
    observer: PartialObserver<Value> | ((value: Value) => any),
  ) => Subscription | Subscription[];
}

export interface Middleware<T, K extends keyof T> {
  (store: Store<T, K>): void;
}

export const createStore = <
  T extends DefaultState,
  K extends keyof T = keyof T,
  U extends K = K
>(
  initState: T,
  middlewares: Middleware<T, U>[] = [],
): Store<T, K> => {
  type Subjects = { [KK in keyof T]: BehaviorSubject<T[K]> };

  // Map each `initState` entiries to a BehaviorSubject
  const subjects: Subjects = Object.keys(initState).reduce(
    (acc, key: string) => {
      const defaultValue = initState[key];
      const subject = new BehaviorSubject<T[K]>(defaultValue);
      return { ...acc, [key]: subject };
    },
    {} as Subjects,
  );

  /**
   * Get the stored value at the key
   * @param key target key
   */
  const get = <Key extends K, Value extends T[K] = T[Key]>(key: Key): Value => {
    return subjects[key].getValue();
  };

  /**
   * Set a new value of the propertie `key` of the store
   * @param key target key
   * @param value new value
   */
  const set = <Key extends K, Value extends T[K] = T[Key]>(
    key: Key,
    value: Value | ((prevValue: Value) => Value),
  ) => {
    subjects[key].next(
      typeof value === 'function' ? (value as Function)(get(key)) : value,
    );
  };

  // @todo conditional typing return
  /**
   * Subscribe to a key of the store
   * @param key target key you want to subscribe
   * @param observer observer that will be called each time the value of key has changed
   */
  const subscribe = <Key extends K, Value extends T[K] = T[Key]>(
    key: Key | '',
    observer: PartialObserver<Value> | ((value: Value) => any),
  ) => {
    const wrappedObserver: PartialObserver<Value> =
      typeof observer === 'function' ? { next: observer } : observer;

    return key === ''
      ? Object.values(subjects).map(sub => sub.subscribe(wrappedObserver))
      : subjects[key].subscribe(wrappedObserver);
  };

  // Create the store
  const store = { get, set, subscribe };

  // Intialize all middlewares
  middlewares.forEach(factory => factory(store));

  return store;
};
