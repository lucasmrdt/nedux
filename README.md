# Nedux - The `n`ext r`edux`

![typescript](https://img.shields.io/badge/-typescript-blueviolet) [![version](https://img.shields.io/badge/version-beta-blue)](https://www.npmjs.com/package/nedux) [![size](https://img.shields.io/bundlephobia/minzip/nedux?color=green&label=size)](https://www.npmjs.com/package/nedux)

> Why do you waste your time by creating actions/reducers/containers/sagas/... ? \
> **Just create a store and that's it !**

## 📦 Installation

```bash
npm install nedux --save
```

## 🧲 Use `Nedux` with ...

| library |                        provider                         |
| :-----: | :-----------------------------------------------------: |
|  React  | [react-nedux](https://github.com/lucasmrdt/react-nedux) |
|  VueJS  |                         `todo`                          |
| Angular |                         `todo`                          |

## 😍 Examples

|         Name         |                  Source                   |                                                    Codesandbox                                                     |
| :------------------: | :---------------------------------------: | :----------------------------------------------------------------------------------------------------------------: |
|     ✅ Todo List     |         [here](./examples/todos)          |             [here](https://codesandbox.io/s/nedux-todos-nm8j0?fontsize=14&hidenavigation=1&theme=dark)             |
| 🔎 Logger Middleware |   [here](./examples/logger-middleware)    |           [here](https://codesandbox.io/s/eloquent-black-hbmut?fontsize=14&hidenavigation=1&theme=dark)            |
|      🎛 Counter       | [here](./examples/counter-nedux-vs-redux) | [here](https://codesandbox.io/s/counter-nedux-vs-redux-n34b2?fontsize=14&hidenavigation=1&theme=dark&view=preview) |

## 💻 Basic Example

### Use it with Typescript ♥️

```typescript
import { createStore } from 'nedux';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

enum Filter {
  ShowAll = 'ShowAll',
  ShowCompleted = 'ShowCompleted',
  ShowActive = 'ShowActive',
}

// Create the store
const todoStore = createStore({
  todos: [] as Todo[],
  filter: Filter.ShowAll,
});

// You can subscribe to field update.
todoStore.subscribe('filter', newFilter => {
  console.log(`filter has changed with ${newFilter}`);
});

// You can get a value.
todoStore.get('filter');
// └> 'ShowAll'

// You can override a value.
todoStore.set('filter', Filter.ShowCompleted);

// Or extends value by the previous one.
todoStore.set('todos', todos => [
  ...todos,
  { id: 1, text: 'test', completed: false },
]);

// And that's it !
```

### Or simply with Javascript

```javascript
import { createStore } from 'nedux';

const todoStore = createStore({
  todos: [],
  filter: 'ShowAll',
});

todoStore.subscribe('filter', newFilter => {
  console.log(`filter has changed with ${newFilter}`);
});

todoStore.get('filter');

todoStore.set('filter', 'ShowCompleted');
todoStore.set('todos', todos => [
  ...todos,
  { id: 1, text: 'test', completed: false },
]);
```

## 📜 Documentation

### `Import`

```javascript
// ES6
import { createStore } from 'nedux';

// ES5
var createStore = require('nedux').createStore;
```

### `createStore(initialState, [middlewares])`

Creates a Nedux store with the shape of the `initialState`.

|   argument    | required |             type             | description                                                                                         |
| :-----------: | :------: | :--------------------------: | :-------------------------------------------------------------------------------------------------- |
| `initalState` |    ✅    |           `object`           | The intial state of your store.                                                                     |
| `middlewares` |    ❌    | [Middleware](#middlewares)[] | Middlewares are used to enhance your store see the [middleware section](#middlewares) to know more. |

### `store`

The `store` object created by `createStore` it'll allow you to interact with your store.

<details open>
<summary><b>store.get(key)</b></summary>
<br>

| argument | required |   type   | description                               |
| :------: | :------: | :------: | :---------------------------------------- |
|  `key`   |    ✅    | `string` | The key of the store that you want to get |

</details>

<details open>
<summary><b>store.set(key, value)</b></summary>
<br>

| argument | required |                     type                      | description                                    |
| :------: | :------: | :-------------------------------------------: | :--------------------------------------------- |
|  `key`   |    ✅    |                   `string`                    | The key of the store that you want to override |
| `value`  |    ✅    | `any` <br />or<br />`(prevValue: any) => any` | The new value of the key                       |

</details>

<details open>
<summary><b>store.subscribe(key, observer)</b></summary>
<br>

|  argument  | required |                                                        type                                                         | description                                                                                                      |
| :--------: | :------: | :-----------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------- |
|   `key`    |    ✅    |                                                      `string`                                                       | The key of the store that you'll subscribe to changes. (give a value of `''` will subscribe to all keys changes) |
| `observer` |    ✅    | [observer](http://reactivex.io/rxjs/class/es6/MiscJSDoc.js~ObserverDoc.html) <br /> or <br /> `(value: any) => any` | An rxjs observer or a simple callback which will be fired when the store has been updated for the given key      |

</details>

<a id="middlewares"></a>

## ⚓️ Middlewares

Middleware is the suggested way to extend Nedux with custom functionality. The _created store_ is provided to each middleware. It's easy to `subscribe`/`get`/`set` value to the store inside your middleware. The key feature of middleware is that it is composable. Multiple middleware can be combined together, where each middleware requires no knowledge of what comes before or after it in the chain.

|                           Middleware                           |              Description              |
| :------------------------------------------------------------: | :-----------------------------------: |
| [🔒 nedux-persist](https://github.com/lucasmrdt/nedux-persist) | Allow you to persist your nedux store |

### Basic Logger Middleware

```javascript
import { createStore } from 'nedux';

const loggerMiddleware = store =>
  // we subscribe to all modifications
  store.subscribe('', value => console.log(value));

const store = createStore(
  {
    a: 0,
    b: 'b',
  },
  [loggerMiddleware],
);

store.set('b', 'a');
store.set('a', 1);
store.set('a', a => a * 2);
store.set('b', 'not b');
```

## 🏗 Advised Structure

> It usually a good idea to keep the store as small as possible. You can manage your application by structure it as services. Each service will have its own store _(if it's needed)_

```bash
my-service
├── components # Your components.
│   ├── AddTodo.tsx
│   ├── App.tsx
│   ├── FilterLink.tsx
│   ├── Footer.tsx
│   ├── Link.tsx
│   ├── Todo.tsx
│   └── TodoList.tsx
├── controler.ts # Where you wrap your business logic (link between api/store/ui)
├── index.tsx # Where you export elements to other services.
├── store.ts # Where the store is created with the initial state.
└── types.ts # Where you put your service types.
```

## 🚀 Why choose `Nedux` over `Redux` ?

- [x] No more actions
- [x] No more dispatch
- [x] No more reducers
- [x] No more provider
- [x] Fully functionnal usage
- [x] Easiest to understand
- [x] No "magical" effect _(all is traceable)_
- [x] No need to use external tools to debug _(again all is traceable)_
- [x] Easiest to learn
- [x] Fully typed _(if you're coding in typescript you will ♥️ it !)_
- [x] Less code to write
- [x] Faster and lighter _(no [react context](https://reactjs.org/docs/context.html), no [HOC](https://reactjs.org/docs/higher-order-components.html))_

> **You just write less to do the same.**

### 🥊 [Redux todos](https://github.com/reduxjs/redux/tree/master/examples/todos) VS [Nedux todos](./examples/todos) _(same code)_

> Feel free to inspect the structure of both of them ([Redux](https://github.com/reduxjs/redux/tree/master/examples/todos) and [Nedux](./examples/todos)) and how Nedux is implemented.

|                       |   Redux    |   Nedux   | Diff _(less is better)_ |
| :-------------------: | :--------: | :-------: | :---------------------: |
|    number of files    |    `13`    |   `11`    |        `-15.4%`         |
|    number of lines    |   `224`    |   `174`   |        `-22.3%`         |
| number of characters  |   `4343`   |  `3298`   |        `-24.0%`         |
| time for first render | `~10.5 ms` | `~8.5 ms` |        `-23.5%`         |
|       add todo        | `~0.8 ms`  | `~0.6 ms` |        `-33.3%`         |

### 🥊 [Redux Counter](./examples/counter) VS [Nedux Counter](./examples/counter) _(same code)_

> Again feel free to test it yourself [here](https://codesandbox.io/s/counter-nedux-vs-redux-n34b2?fontsize=14&hidenavigation=1&theme=dark&view=preview).

|    Render time    |  Redux   |  Nedux   | Diff _(less is better)_ |
| :---------------: | :------: | :------: | :---------------------: |
| with _9999_ items | `0.743s` | `0.481s` |        `-35.3%`         |

### 🏗 Structure

```bash
# Redux Todos
├── actions
│   └── index.js
├── components
│   ├── App.js
│   ├── Footer.js
│   ├── Link.js
│   ├── Todo.js
│   └── TodoList.js
├── containers
│   ├── AddTodo.js
│   ├── FilterLink.js
│   └── VisibleTodoList.js
├── index.js
└── reducers
    ├── index.js
    ├── todos.js
    └── visibilityFilter.js
```

```bash
# Nedux Todos
├── components
│   ├── AddTodo.tsx
│   ├── App.tsx
│   ├── FilterLink.tsx
│   ├── Footer.tsx
│   ├── Link.tsx
│   ├── Todo.tsx
│   └── TodoList.tsx
├── controler.ts
├── index.tsx
├── store.ts
└── types.ts
```

### 🧩 Scripts used

```bash
# Compute number of files
find $SRC_FOLDER -type f | wc -l

# Compute number of lines
find $SRC_FOLDER -type f -exec cat {} \; | grep -v -e '^$' | grep -v -e '^//' | wc -l

# Compute number of characters
find $SRC_FOLDER -type f -exec cat {} \; | grep -v -e '^$' | grep -v -e '^//' | tr -d '[:space:] ' | wc -c
```

### 🔎 Profiling method

Profiling is made with [React Profiling](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) following this configuration :

|                        |                                 |
| :--------------------: | :-----------------------------: |
|     **Navigator**      | Chrome _78.0.3904.108 (64-bit)_ |
| **Profiling Software** |  React Developer Tools _4.2.1_  |
|         **OS**         |    MacOS Catalina _10.15.1_     |
|       **Model**        |   MacBook Pro (15-inch, 2018)   |
|     **Processor**      |  2.2 GHz 6-Core Intel Core i7   |
|       **Memory**       |       16 GB 2400 MHz DDR4       |
|      **Graphic**       | Intel UHD Graphics 630 1536 MB  |

## 📋 Todos

- [x] Add sandbox for each examples
- [ ] Add tests
- [ ] Be more accurate on performance comparison
- [ ] Add more examples
- [ ] Type cleaning
- [ ] Add CI
- [ ] Add VueJS connector
- [ ] Add Angular connector

## 🙋🏼 Contributions

All [Pull Requests](https://github.com/lucasmrdt/nedux/compare?expand=1), [Issues](https://github.com/lucasmrdt/nedux/issues) and [Discussions](https://github.com/lucasmrdt/nedux/issues) are welcomed !
