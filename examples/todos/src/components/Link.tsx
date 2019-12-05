// @from https://github.com/reduxjs/redux/blob/master/examples/todos/src/components/Link.js

import React from 'react';

type Props = {
  active: boolean;
  onClick: () => any;
};

const Link: React.FC<Props> = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    disabled={active}
    style={{
      marginLeft: '4px',
    }}
  >
    {children}
  </button>
);

export default Link;
