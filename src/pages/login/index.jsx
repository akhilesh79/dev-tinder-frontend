import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { VITE_API_BASE_URL } from '../../constants/common';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/appSlices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginFlow, setIsLoginFlow] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    ...(isLoginFlow
      ? {}
      : {
          firstName: Yup.string().required('First name is required'),
          lastName: Yup.string().required('Last name is required'),
        }),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (isLoginFlow) {
          const response = await axios.post(
            VITE_API_BASE_URL + '/auth/login',
            {
              emailId: values.email,
              password: values.password,
            },
            { withCredentials: true },
          );

          if (!response.data) {
            throw new Error('No response data received');
          }

          dispatch(setUser(response.data.data));
          toast.success(response.data.message);
          navigate('/');
        } else {
          const response = await axios.post(
            VITE_API_BASE_URL + '/auth/signup',
            {
              firstName: values.firstName,
              lastName: values.lastName,
              emailId: values.email,
              password: values.password,
            },
            { withCredentials: true },
          );

          if (!response.data) {
            throw new Error('No response data received');
          }

          dispatch(setUser(response.data.data));
          toast.success(response.data.message);
          navigate('/profile');
        }
      } catch (error) {
        console.error('Login failed:', error);
        const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
        toast.error(errorMessage);
      }
    },
  });

  const handleForgotPassword = () => {
    // navigate('/forgot-password');
  };

  return (
    <div className='min-h-full flex flex-col lg:flex-row'>
      {/* Left — Branding panel (desktop only) */}
      <div className='hidden lg:flex flex-col justify-center items-center flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 p-12 relative overflow-hidden'>
        {/* Dot grid pattern */}
        <div
          className='absolute inset-0 opacity-[0.12]'
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        ></div>

        {/* Blob accents */}
        <div className='absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl'></div>

        {/* Content */}
        <div className='relative z-10 text-center max-w-sm'>
          <div className='flex items-center justify-center mb-6'>
            <div className='w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center'>
              <svg viewBox='0 0 24 24' className='w-10 h-10 fill-white' xmlns='http://www.w3.org/2000/svg'>
                <path d='M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z' />
              </svg>
            </div>
          </div>
          <h1 className='text-5xl font-bold font-poppins text-white mb-4 leading-tight'>DevTinder</h1>
          <p className='text-white/80 text-lg leading-relaxed mb-10'>
            Connect with developers who code like you. Find your perfect tech partner.
          </p>
          <div className='flex flex-wrap justify-center gap-2'>
            {['React', 'Node.js', 'Python', 'TypeScript', 'Go', 'Rust', 'Vue', 'Next.js'].map((tech) => (
              <span
                key={tech}
                className='px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white text-sm rounded-full border border-white/20 font-medium'
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form panel */}
      <div className='flex-1 flex items-center justify-center p-6 py-8 bg-[color:var(--bg-primary)]'>
        <div
          className='w-full max-w-md rounded-2xl border p-7 sm:p-9 shadow-xl backdrop-blur'
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          {/* Mobile logo */}
          <div className='lg:hidden flex items-center justify-center gap-2 mb-6'>
            <svg viewBox='0 0 24 24' className='w-6 h-6 fill-rose-500' xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z' />
            </svg>
            <span className='text-xl font-bold font-poppins bg-gradient-to-r from-rose-500 to-indigo-500 bg-clip-text text-transparent'>
              DevTinder
            </span>
          </div>

          <h2 className='text-2xl sm:text-3xl font-bold tracking-tight text-[color:var(--text-primary)] mb-2'>
            {isLoginFlow ? 'Welcome back 👋' : 'Create account'}
          </h2>
          <p className='text-sm text-[color:var(--text-secondary)] mb-7'>
            {isLoginFlow
              ? 'Log in to continue your developer journey.'
              : 'Sign up to start connecting with developers.'}
          </p>

          <form onSubmit={formik.handleSubmit} className='space-y-4'>
            {!isLoginFlow && (
              <div className='grid grid-cols-2 gap-3'>
                {/* First Name */}
                <div>
                  <label
                    htmlFor='firstName'
                    className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]'
                  >
                    First Name
                  </label>
                  <input
                    id='firstName'
                    type='text'
                    {...formik.getFieldProps('firstName')}
                    className='w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition'
                    placeholder='John'
                    style={{
                      backgroundColor: 'var(--input-bg)',
                      borderColor:
                        formik.touched.firstName && formik.errors.firstName ? '#ef4444' : 'var(--input-border)',
                      color: 'var(--input-text)',
                    }}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className='mt-1 text-xs text-red-500'>{formik.errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor='lastName'
                    className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]'
                  >
                    Last Name
                  </label>
                  <input
                    id='lastName'
                    type='text'
                    {...formik.getFieldProps('lastName')}
                    className='w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition'
                    placeholder='Doe'
                    style={{
                      backgroundColor: 'var(--input-bg)',
                      borderColor:
                        formik.touched.lastName && formik.errors.lastName ? '#ef4444' : 'var(--input-border)',
                      color: 'var(--input-text)',
                    }}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className='mt-1 text-xs text-red-500'>{formik.errors.lastName}</p>
                  )}
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor='email'
                className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]'
              >
                Email Address
              </label>
              <input
                id='email'
                type='email'
                {...formik.getFieldProps('email')}
                className='w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition'
                placeholder='you@example.com'
                style={{
                  backgroundColor: 'var(--input-bg)',
                  borderColor: formik.touched.email && formik.errors.email ? '#ef4444' : 'var(--input-border)',
                  color: 'var(--input-text)',
                }}
              />
              {formik.touched.email && formik.errors.email && (
                <p className='mt-1 text-xs text-red-500'>{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor='password'
                className='mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  className='w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition pr-10'
                  placeholder='At least 6 characters'
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderColor: formik.touched.password && formik.errors.password ? '#ef4444' : 'var(--input-border)',
                    color: 'var(--input-text)',
                  }}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 transition hover:opacity-70'
                  style={{ color: 'var(--text-secondary)' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className='mt-1 text-xs text-red-500'>{formik.errors.password}</p>
              )}
            </div>

            {/* Forgot password */}
            {isLoginFlow && (
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={handleForgotPassword}
                  className='text-xs transition hover:opacity-80'
                  style={{ color: 'var(--link-color)' }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type='submit'
              disabled={formik.isSubmitting || !formik.isValid}
              className='w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed mt-2'
              style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)' }}
            >
              {formik.isSubmitting
                ? isLoginFlow
                  ? 'Logging in...'
                  : 'Creating account...'
                : isLoginFlow
                  ? 'Log In'
                  : 'Create Account'}
            </button>
          </form>

          <p className='mt-5 text-center text-xs text-[color:var(--text-secondary)]'>
            {isLoginFlow ? "Don't have an account? " : 'Already have an account? '}
            <span
              onClick={() => setIsLoginFlow(!isLoginFlow)}
              className='font-semibold cursor-pointer transition hover:opacity-80'
              style={{ color: 'var(--link-color)' }}
            >
              {isLoginFlow ? 'Sign up' : 'Log in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
