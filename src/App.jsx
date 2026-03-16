import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Body';

const App = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Body />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
