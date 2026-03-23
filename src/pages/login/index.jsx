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
    <div className='overflow-auto' style={{ height: 'calc(100vh - 132px)' }}>
      <div className='bg-[color:var(--bg-primary)] flex items-center justify-center px-4 py-2 sm:py-6'>
        <div
          className='w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl border p-6 sm:p-8 shadow-2xl backdrop-blur'
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <h2 className='text-center text-2xl sm:text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] mb-4 sm:mb-6'>
            Welcome to DevTinder
          </h2>
          <p className='text-center text-xs sm:text-sm text-[color:var(--text-secondary)] mb-6 sm:mb-8'>
            {isLoginFlow
              ? 'Log in to DevTinder to continue your developer journey.'
              : 'Sign up to DevTinder to start your developer journey.'}
          </p>

          <form onSubmit={formik.handleSubmit} className='space-y-5'>
            {!isLoginFlow && (
              <>
                {/* First Name Field */}
                <div>
                  <label
                    htmlFor='firstName'
                    className='mb-2 block text-sm font-medium text-[color:var(--text-secondary)]'
                  >
                    First Name
                  </label>
                  <input
                    id='firstName'
                    type='text'
                    {...formik.getFieldProps('firstName')}
                    className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 transition ${
                      formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : ''
                    }`}
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

                {/* Last Name Field */}
                <div>
                  <label
                    htmlFor='lastName'
                    className='mb-2 block text-sm font-medium text-[color:var(--text-secondary)]'
                  >
                    Last Name
                  </label>
                  <input
                    id='lastName'
                    type='text'
                    {...formik.getFieldProps('lastName')}
                    className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 transition ${
                      formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : ''
                    }`}
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
              </>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor='email' className='mb-2 block text-sm font-medium text-[color:var(--text-secondary)]'>
                Email Address
              </label>
              <input
                id='email'
                type='email'
                {...formik.getFieldProps('email')}
                className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 transition ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                }`}
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

            {/* Password Field */}
            <div>
              <label htmlFor='password' className='mb-2 block text-sm font-medium text-[color:var(--text-secondary)]'>
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  className={`w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 transition pr-10 ${
                    formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                  }`}
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
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className='mt-1 text-xs text-red-500'>{formik.errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className='flex items-center justify-between text-sm'>
              <button
                type='button'
                onClick={handleForgotPassword}
                className='transition hover:opacity-80'
                style={{ color: 'var(--link-color)' }}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={formik.isSubmitting || !formik.isValid}
              className='w-full rounded-xl px-4 py-2 text-base font-semibold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed'
              style={{
                backgroundColor: 'var(--button-bg)',
                color: 'var(--button-text)',
              }}
            >
              {formik.isSubmitting
                ? isLoginFlow
                  ? 'Logging in...'
                  : 'Signing up...'
                : isLoginFlow
                  ? 'Log In'
                  : 'Sign Up'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className='mt-6 text-center text-xs text-[color:var(--text-secondary)]'>
            {isLoginFlow ? "Don't have an account? " : 'Already have an account? '}
            <span
              onClick={() => setIsLoginFlow(!isLoginFlow)}
              className='font-medium cursor-pointer transition hover:opacity-80'
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
