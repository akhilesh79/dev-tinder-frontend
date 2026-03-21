import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { VITE_API_BASE_URL } from '../../constants/common';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/appSlices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        VITE_API_BASE_URL + '/api/auth/login',
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true },
      );

      if (!response.data) {
        throw new Error('No response data received');
      }

      dispatch(setUser(response.data.data));
      toast.success(response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className='min-h-screen bg-[color:var(--bg-primary)] flex items-center justify-center px-4 py-2 sm:py-6'>
      <div
        className='w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl border p-6 sm:p-8 shadow-2xl backdrop-blur'
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <h2 className='text-center text-2xl sm:text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] mb-4 sm:mb-6'>
          Welcome back
        </h2>
        <p className='text-center text-xs sm:text-sm text-[color:var(--text-secondary)] mb-6 sm:mb-8'>
          Log in to DevTinder to continue your developer journey.
        </p>

        <div className='space-y-5'>
          <div>
            <label htmlFor='email' className='mb-2 block text-sm font-medium text-[color:var(--text-secondary)]'>
              Email Address
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 transition'
              placeholder='you@example.com'
              style={{
                backgroundColor: 'var(--input-bg)',
                borderColor: 'var(--input-border)',
                color: 'var(--input-text)',
              }}
            />
          </div>

          <div>
            <label htmlFor='password' className='mb-2 block text-sm font-medium text-[color:var(--text-secondary)]'>
              Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 transition'
              placeholder='At least 6 characters'
              style={{
                backgroundColor: 'var(--input-bg)',
                borderColor: 'var(--input-border)',
                color: 'var(--input-text)',
              }}
            />
          </div>

          <div className='flex items-center justify-between text-sm'>
            <button type='button' className='transition hover:opacity-80' style={{ color: 'var(--link-color)' }}>
              Forgot password?
            </button>
          </div>

          <button
            type='button'
            onClick={handleSubmit}
            className='w-full rounded-xl px-4 py-2 text-base font-semibold transition hover:opacity-90'
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
            }}
          >
            Log In
          </button>
        </div>

        <p className='mt-6 text-center text-xs text-[color:var(--text-secondary)]'>
          Don't have an account?{' '}
          <span
            className='font-medium cursor-pointer transition hover:opacity-80'
            style={{ color: 'var(--link-color)' }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
