"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nedux_1 = require("nedux");
var createLoggerMiddleware = function (keys) { return function (store) {
    keys.forEach(function (key) { return store.subscribe(key, { next: console.log }); });
}; };
var store = nedux_1.createStore({
    a: 0,
    b: 'b',
}, [createLoggerMiddleware(['a'])]);
store.set('a', 1);
store.set('a', function (a) { return a * 2; });
store.set('b', 'not b');
