# Nedux - The Next Redux

> _🧠 Nedux = Next rEDUX_

## 🚀 Why choose `Nedux` over `Redux` ?

- [x] No more actions
- [x] No more dispatch
- [x] No more reducers
- [x] No more provider
- [x] No need to use external packages ([redux-saga](https://github.com/redux-saga/redux-saga) or [redux-persist](https://github.com/rt2zz/redux-persist))
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
|    number of lines    |   `224`    |   `172`   |        `-23.2%`         |
| number of characters  |   `4343`   |  `3297`   |        `-24.0%`         |
| time for first render | `~10.5 ms` | `~8.5 ms` |        `-23.5%`         |
|       add todo        | `~0.8 ms`  | `~0.6 ms` |        `-33.3%`         |

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
find $(SRC_FOLDER) -type f | wc -l

# Compute number of lines
find $(SRC_FOLDER) -type f -exec cat {} \; | grep -v -e '^$' | grep -v -e '^//' | wc -l

# Compute number of characters
find $(SRC_FOLDER) -type f -exec cat {} \; | grep -v -e '^$' | grep -v -e '^//' | tr -d '[:space:] ' | wc -c
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
