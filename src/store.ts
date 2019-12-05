/* eslint react-hooks/rules-of-hooks: 0 */

import { BehaviorSubject, PartialObserver } from 'rxjs';
import { useState, useEffect, useCallback } from 'react';

type Setter<T> = (newValue: T) => void;

// @todo split this in other package
const useReactStore = <T>(
  subject: BehaviorSubject<T>,
  defaultValue: T,
): [T, Setter<T>] => {
  // Use react state
  const [value, setValue] = useState<T>(defaultValue);

  // Overide the react setter
  const setter: Setter<T> = useCallback(
    (newValue: any) => subject.next(newValue),
    [subject],
  );

  useEffect(() => {
    // Initialise subscribers
    const subscription = subject.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [setValue, subject]);

  return [value, setter];
};

export const createStore = <
  T extends { [key: string]: any },
  K extends keyof T = keyof T
>(
  initState: T,
  { persistedKeys = [] }: { persistedKeys?: K[] } = {},
) => {
  type Subjects = { [KK in keyof T]: BehaviorSubject<T[K]> };

  const persistedKeysSet = new Set(persistedKeys);
  const state: T = initState;

  // Primitive subscriber, which allows to keep state updated
  const persisterObserver = (key: K) => (value: any) =>
    localStorage.setItem(key as string, JSON.stringify(value));

  // Map each `initState` entiries to a BehaviorSubject
  const subjects: Subjects = Object.keys(initState).reduce(
    (acc, key: string) => {
      const isPersistingKey = persistedKeysSet.has(key as K);

      // Get default value
      // @todo make that more generic
      const defaultValue =
        (isPersistingKey && JSON.parse(localStorage.getItem(key) as any)) ||
        initState[key];

      const subject = new BehaviorSubject<T[K]>(defaultValue);

      isPersistingKey && subject.subscribe(persisterObserver(key as K));

      return { ...acc, [key]: subject };
    },
    {} as Subjects,
  );

  const use = <Key extends K, Value extends T[K] = T[Key]>(key: Key) =>
    useReactStore<Value>(subjects[key], state[key]);

  const get = <Key extends K, Value extends T[K] = T[Key]>(key: Key): Value =>
    subjects[key].getValue();

  const set = <Key extends K, Value extends T[K] = T[Key]>(
    key: Key,
    value: Value | ((prevValue: Value) => Value),
  ) => subjects[key].next(value === 'function' ? value(get(key)) : value);

  const subscribe = <Key extends K, Value extends T[K] = T[Key]>(
    key: Key,
    observer: PartialObserver<Value>,
  ) => subjects[key].subscribe(observer);

  return { use, get, set, subscribe };
};
