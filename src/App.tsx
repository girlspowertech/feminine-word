import { BrowserRouter } from 'react-router-dom';
import {
  StarsCanvas,
  WordArc,
  CircleChars,
} from './components';


const App = () => {
  const modules = import.meta.glob('/public/models/*.glb');
  const gltfUrls = Object.keys(modules).slice(0, 25)

  return (
    <BrowserRouter>
      <StarsCanvas />
      <CircleChars urls={ gltfUrls } />
    </BrowserRouter>
  );
};

export default App;
