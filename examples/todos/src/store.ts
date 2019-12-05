import { createStore } from 'nedux';
import { ITodo, Filter } from './types';

export const todoStore = createStore({
  todos: [] as ITodo[],
  filter: Filter.ShowAll,
});
