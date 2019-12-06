// @from https://github.com/reduxjs/redux/blob/master/examples/todos/src/containers/VisibleTodoList.js

import React from 'react';
import Todo from './Todo';
import { toggleTodo } from '../controler';
import { useTodo } from '../store';

import { ITodo, Filter } from '../types';

const getVisibleTodos = (todos: ITodo[], filter: Filter) => {
  switch (filter) {
    case Filter.ShowAll:
      return todos;
    case Filter.ShowCompleted:
      return todos.filter(t => t.completed);
    case Filter.ShowActive:
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
};

const TodoList = () => {
  const [todos] = useTodo('todos');
  const [filter] = useTodo('filter');
  const visibleTodos = getVisibleTodos(todos, filter);

  return (
    <ul>
      {visibleTodos.map(todo => (
        <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
      ))}
    </ul>
  );
};

export default TodoList;
