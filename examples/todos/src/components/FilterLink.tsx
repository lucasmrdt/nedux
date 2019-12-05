// @from https://github.com/reduxjs/redux/blob/master/examples/todos/src/containers/FilterLink.js

import React from 'react';
import { todoStore } from '../store';
import Link from './Link';

import { Filter } from '../types';

type Props = {
  filter: Filter;
  children: any;
};

const FilterLink: React.FC<Props> = ({ filter, children }) => {
  const [activeFilter, setFilter] = todoStore.use('filter');

  return (
    <Link active={filter === activeFilter} onClick={() => setFilter(filter)}>
      {children}
    </Link>
  );
};

export default FilterLink;
