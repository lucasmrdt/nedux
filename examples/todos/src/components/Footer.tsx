// @from https://github.com/reduxjs/redux/blob/master/examples/todos/src/components/Footer.js

import React from 'react';
import FilterLink from './FilterLink';

import { Filter } from '../types';

const Footer = () => (
  <div>
    <span>Show: </span>
    <FilterLink filter={Filter.ShowAll}>All</FilterLink>
    <FilterLink filter={Filter.ShowActive}>Active</FilterLink>
    <FilterLink filter={Filter.ShowCompleted}>Completed</FilterLink>
  </div>
);

export default Footer;
