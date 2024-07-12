import { BrowserRouter } from 'react-router-dom';
import {
  StarsCanvas,
  WordArc,
  CircleChars,
} from './components';

// 娪
// 娥
// 奸
// 娼
// 妮
// 媮
// 妈
// 嫖
// 妇
// 姣
// 姦
// 奻
// 㚣
// 𡛀
// 婦
// 婵
// 姬
// 娉
// 嫎
const App = () => {
  return (
    <BrowserRouter>
      <StarsCanvas />
      <CircleChars elements={['娪', '娥', '奸', '娼', '妮', '媮', '妈', '嫖', '妇', '姣', '姦', '奻', '㚣', '𡛀', '婦', '婵', '姬', '娉', '嫎']} />
      {/* <WordArc /> */}
    </BrowserRouter>
  );
};

export default App;
