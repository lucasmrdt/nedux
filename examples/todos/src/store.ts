import { createStore } from 'nedux';
import { createStoreHook } from 'react-nedux';
import { ITodo, Filter } from './types';

export const todoStore = createStore({
  todos: [] as ITodo[],
  filter: Filter.ShowAll,
});

export const useTodo = createStoreHook(todoStore);
