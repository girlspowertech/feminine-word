import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  StarsCanvas,
  CircleChars,
  CharInfo
} from './components';


const App = () => {

  const [char, setChar] = useState<string | null>(null);
  return (
    <BrowserRouter>
      <StarsCanvas />
      <CircleChars onChoose={ setChar } />
      { char && <CharInfo char={ char } /> }
    </BrowserRouter>
  );
};

export default App;
