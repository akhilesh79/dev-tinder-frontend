import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Body';
import Login from './pages/login';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './context/ThemeProvider';
import { Provider } from 'react-redux';
import appStore from './store/appStore';
import Feed from './pages/feed';
import Profile from './pages/profile';

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <ThemeProvider>
          <BrowserRouter basename='/'>
            <Routes>
              <Route path='/' element={<Body />}>
                <Route path='/' element={<Feed />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <ToastContainer position='bottom-right' />
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
