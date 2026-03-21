import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:7777/api/auth/login',
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true },
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex items-center justify-center px-4 py-10 sm:py-12'>
      <div className='w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl border border-indigo-400/20 bg-slate-900/80 p-6 sm:p-8 shadow-2xl backdrop-blur'>
        <h2 className='text-center text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-4 sm:mb-6'>
          Welcome back
        </h2>
        <p className='text-center text-xs sm:text-sm text-slate-300 mb-6 sm:mb-8'>
          Log in to DevTinder to continue your developer journey.
        </p>

        <div className='space-y-5'>
          <div>
            <label htmlFor='email' className='mb-2 block text-sm font-medium text-slate-200'>
              Email Address
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full rounded-xl border border-slate-600 bg-slate-950/40 px-3 py-2 text-slate-100 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40'
              placeholder='you@example.com'
            />
          </div>

          <div>
            <label htmlFor='password' className='mb-2 block text-sm font-medium text-slate-200'>
              Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full rounded-xl border border-slate-600 bg-slate-950/40 px-3 py-2 text-slate-100 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40'
              placeholder='At least 6 characters'
            />
          </div>

          <div className='flex items-center justify-between text-sm text-slate-300'>
            <button type='button' className='text-indigo-300 hover:text-indigo-100'>
              Forgot password?
            </button>
          </div>

          <button
            type='button'
            onClick={handleSubmit}
            className={`w-full rounded-xl px-4 py-2 text-base font-semibold transition bg-indigo-400/60 text-slate-300`}
          >
            Log In
          </button>
        </div>

        <p className='mt-6 text-center text-xs text-slate-400'>
          Don't have an account?{' '}
          <span className='font-medium text-indigo-300 hover:text-indigo-100 cursor-pointer'>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
