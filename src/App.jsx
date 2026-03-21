import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Body';
import Login from './pages/login';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
