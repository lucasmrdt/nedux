import { todoStore } from './store';

import { Filter } from './types';

let id = 0;

export const addTodo = (text: string) => {
  todoStore.set('todos', todos => [
    ...todos,
    { completed: false, id: id++, text },
  ]);
};

export const toggleTodo = (id: number) => {
  todoStore.set('todos', todos =>
    todos.map(todo => ({
      ...todo,
      completed: todo.id === id ? !todo.completed : todo.completed,
    })),
  );
};

export const setFilter = (filter: Filter) => {
  todoStore.set('filter', filter);
};
