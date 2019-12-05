// @from https://github.com/reduxjs/redux/blob/master/examples/todos/src/containers/AddTodo.js

import React from 'react';
import { addTodo } from '../controler';

const AddTodo = () => {
  let input: HTMLInputElement;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          addTodo(input.value);
          input.value = '';
        }}
      >
        <input ref={node => (input = node as HTMLInputElement)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
