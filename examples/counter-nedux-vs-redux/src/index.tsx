import React, { useState } from 'react';
import { render } from 'react-dom';
import Redux from './redux';
import Nedux from './nedux';

import './index.css';

const App = () => {
  const [nb, setNb] = useState(100);

  return (
    <div>
      <input
        type="range"
        step={1}
        min={1}
        max={9999}
        onChange={e => setNb(parseInt(e.currentTarget.value))}
      />
      <div className={'container'}>
        <Redux nb={nb} />
        <Nedux nb={nb} />
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
