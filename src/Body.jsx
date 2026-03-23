import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from './components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { VITE_API_BASE_URL } from './constants/common';
import { setUser } from './store/appSlices/userSlice';
import { toast } from 'react-toastify';

const Body = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(VITE_API_BASE_URL + '/profile/view', { withCredentials: true });

        if (!response.data) {
          throw new Error('No response data received');
        }

        dispatch(setUser(response.data));
      } catch (error) {
        console.error('Error fetching user:', error);
        if (error.status === 401) {
          toast.error(error.message);
          navigate('/login');
        } else {
          toast.error(`Failed to fetch user data: ${error.message}`);
        }
      }
    };

    if (!user) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='container mx-auto h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)]'>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Body;
