import { BehaviorSubject, NextObserver, Subscription } from 'rxjs';

type DefaultState = { [key: string]: any };

type SubscriptionOptions = { withInitialValue?: boolean };

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
    observer: NextObserver<Value> | ((value: Value) => any),
    options?: SubscriptionOptions,
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
  middleware: Middleware<T, U>[] = [],
): Store<T, K> => {
  type Subjects = { [KK in keyof T]: BehaviorSubject<T[K]> };

  // Map each `initState` entries to a BehaviorSubject
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
   * Set a new value of the property `key` of the store
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
    observer: NextObserver<Value> | ((value: Value, key: Key) => any),
    { withInitialValue = false }: SubscriptionOptions = {},
  ) => {
    let hasBeenInitialized = false;

    const validObserverFactory = (k: Key): NextObserver<Value> =>
      typeof observer === 'function'
        ? { next: value => observer(value, k) }
        : observer;

    const wrappedObserverFactory = (k: Key): NextObserver<Value> => {
      const validObserver = validObserverFactory(k);
      return {
        ...validObserver,
        next: withInitialValue
          ? validObserver.next
          : (nextValue: Value) => {
              if (hasBeenInitialized) {
                validObserver.next && validObserver.next(nextValue);
              } else {
                hasBeenInitialized = true;
              }
            },
      };
    };

    return key === ''
      ? Object.keys(subjects).map(key =>
          subjects[key].subscribe(wrappedObserverFactory(key as Key)),
        )
      : subjects[key].subscribe(wrappedObserverFactory(key));
  };

  // Create the store
  const store = { get, set, subscribe };

  // Initialize all middleware
  middleware.forEach(factory => factory(store));

  return store;
};
