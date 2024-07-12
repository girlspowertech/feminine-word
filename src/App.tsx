import { BrowserRouter } from 'react-router-dom';
import {
  StarsCanvas,
  CircleChars,
} from './components';


const App = () => {

  return (
    <BrowserRouter>
      <StarsCanvas />
      <CircleChars  />
    </BrowserRouter>
  );
};

export default App;
