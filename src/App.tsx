import { BrowserRouter } from 'react-router-dom';
import {
  StarsCanvas,
} from './components';

const App = () => {
  return (
    <BrowserRouter>
      <StarsCanvas />
    </BrowserRouter>
  );
};

export default App;
