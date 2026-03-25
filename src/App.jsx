import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './Body';
import Login from './pages/login';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './context/ThemeProvider';
import { Provider } from 'react-redux';
import appStore from './store/appStore';
import Feed from './pages/feed';
import React from 'react';
const Profile = React.lazy(() => import('./pages/profile'));
const UserConnections = React.lazy(() => import('./pages/user-connections'));
const Requests = React.lazy(() => import('./pages/requests'));
const PrivacyPolicy = React.lazy(() => import('./pages/policy/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/policy/TermsOfService'));
const RefundPolicy = React.lazy(() => import('./pages/policy/RefundPolicy'));

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
                <Route path='/user-connections' element={<UserConnections />} />
                <Route path='/user-requests' element={<Requests />} />
              </Route>
              {/* Public policy pages — no auth required */}
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/terms-of-service' element={<TermsOfService />} />
              <Route path='/refund-policy' element={<RefundPolicy />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer position='bottom-right' />
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
