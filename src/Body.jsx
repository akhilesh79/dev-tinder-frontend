import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from './components';

const Body = () => {
  return (
    <main className='container mx-auto'>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Body;
