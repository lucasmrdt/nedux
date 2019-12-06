import { createStore } from 'nedux';
import { createStoreHook } from 'react-nedux';
import { ITodo, Filter } from './types';

type Store = {
  todos: ITodo[];
  filter: Filter;
};

export const todoStore = createStore<Store>({
  todos: [],
  filter: Filter.ShowAll,
});

export const useTodo = createStoreHook<Store>(todoStore);
