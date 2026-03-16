import React from 'react';
import { Footer, Navbar } from './components/common';
import { Outlet } from 'react-router-dom';
const Body = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Body;
