import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { skillOptions, VITE_API_BASE_URL } from '../../constants/common';
import { setUser } from '../../store/appSlices/userSlice';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { Mail, MapPin, Briefcase } from 'lucide-react';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const schemaValidation = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    age: Yup.number().required('Age is required').min(18, 'You must be at least 18 years old'),
    gender: Yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender').required('Gender is required'),
    about: Yup.string().max(500, 'About section cannot exceed 500 characters'),
    skills: Yup.array().of(Yup.string().oneOf(skillOptions.map((o) => o.value))),
    profileImage: Yup.string().required('Profile image is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      age: user?.age || '',
      gender: user?.gender || '',
      about: user?.about || '',
      skills: user?.skills || [],
      profileImage: user?.profileImage || '',
    },
    validationSchema: schemaValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(VITE_API_BASE_URL + '/api/profile/edit', values, { withCredentials: true });

        if (!response.data) {
          throw new Error('No response data received');
        }

        dispatch(setUser(response.data.data));
        toast.success(response.data.message);
      } catch (error) {
        console.error('Error submitting form:', error);
        const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
        toast.error(errorMessage);
      }
    },
  });

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#3f3f46',
      borderRadius: '0.75rem',
      borderColor: '#52525b',
      boxShadow: 'none',
      padding: '2px',
      border: '1px solid #52525b',
      '&:hover': {
        borderColor: '#a1a1aa',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#27272a',
      borderRadius: '0.75rem',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#6366f1' : 'transparent',
      color: 'white',
      cursor: 'pointer',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#6366f1',
      borderRadius: '0.5rem',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      ':hover': {
        backgroundColor: '#4f46e5',
        color: 'white',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a1a1aa',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };

  return (
    <div className='bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-center'>
        {/* Live Preview Card - Left Side */}
        <div className='lg:col-span-2 '>
          <div className='bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 hover:border-slate-600 transition-all'>
            {/* Profile Image Banner */}
            <div className='relative h-40 bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden'>
              {formik.values.profileImage ? (
                <img
                  src={formik.values.profileImage}
                  alt='Profile Banner'
                  className='w-full h-full object-cover opacity-40'
                />
              ) : (
                <div className='w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600'></div>
              )}
            </div>

            {/* Profile Content */}
            <div className='px-6 pb-6'>
              {/* Avatar */}
              <div className='flex justify-center -mt-16 mb-4'>
                <div className='relative'>
                  {formik.values.profileImage ? (
                    <img
                      src={formik.values.profileImage}
                      alt='Avatar'
                      className='w-32 h-32 rounded-full border-4 border-slate-800 object-cover shadow-lg'
                    />
                  ) : (
                    <div className='w-32 h-32 rounded-full border-4 border-slate-800 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg'>
                      {formik.values.firstName.charAt(0).toUpperCase()}
                      {formik.values.lastName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Name */}
              <h3 className='text-center text-2xl font-bold text-white mb-1'>
                {formik.values.firstName || 'First'} {formik.values.lastName || 'Last'}
              </h3>

              {/* Age & Gender */}
              <div className='text-center text-sm text-slate-400 mb-4'>
                {formik.values.age && `${formik.values.age} years old`} • {formik.values.gender || 'Gender'}
              </div>

              {/* About */}
              {formik.values.about && (
                <p className='text-slate-300 text-sm leading-relaxed mb-4 text-center'>{formik.values.about}</p>
              )}

              {/* Skills */}
              {formik.values.skills.length > 0 && (
                <div className='mb-4'>
                  <p className='text-xs uppercase tracking-wider text-slate-400 mb-3 text-center font-semibold'>
                    Skills
                  </p>
                  <div className='flex flex-wrap gap-2 justify-center'>
                    {formik.values.skills.map((skill) => (
                      <span
                        key={skill}
                        className='px-3 py-1 bg-indigo-600/30 border border-indigo-500/50 text-indigo-200 text-xs rounded-full'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className='border-t border-slate-700 my-4'></div>

              {/* Footer Info */}
              <div className='space-y-2 text-xs text-slate-400'>
                <div className='flex items-center justify-center gap-2'>
                  <Briefcase size={14} />
                  <span>Developer Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form - Right Side */}
        <div className='lg:col-span-3'>
          <div
            className='bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-slate-700'
            style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}
          >
            <div className='mb-8'>
              <h2 className='text-3xl font-bold text-white mb-2'>Edit Profile</h2>
              <p className='text-slate-400'>Update your profile information. Changes are reflected instantly.</p>
            </div>

            <form onSubmit={formik.handleSubmit} className='space-y-6'>
              {/* Name Row */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-semibold text-slate-300 mb-2'>First Name</label>
                  <input
                    type='text'
                    id='firstName'
                    {...formik.getFieldProps('firstName')}
                    className={`w-full bg-slate-700 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                      formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder='John'
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className='text-red-400 text-xs mt-1'>{formik.errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-slate-300 mb-2'>Last Name</label>
                  <input
                    type='text'
                    id='lastName'
                    {...formik.getFieldProps('lastName')}
                    className={`w-full bg-slate-700 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                      formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder='Doe'
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className='text-red-400 text-xs mt-1'>{formik.errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Profile Image URL */}
              <div>
                <label className='block text-sm font-semibold text-slate-300 mb-2'>Profile Image URL</label>
                <input
                  type='text'
                  id='profileImage'
                  {...formik.getFieldProps('profileImage')}
                  className={`w-full bg-slate-700 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                    formik.touched.profileImage && formik.errors.profileImage ? 'border-red-500' : 'border-slate-600'
                  }`}
                  placeholder='https://example.com/image.jpg'
                />
                {formik.touched.profileImage && formik.errors.profileImage && (
                  <p className='text-red-400 text-xs mt-1'>{formik.errors.profileImage}</p>
                )}
              </div>

              {/* Age & Gender Row */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-semibold text-slate-300 mb-2'>Age</label>
                  <input
                    type='number'
                    id='age'
                    {...formik.getFieldProps('age')}
                    className={`w-full bg-slate-700 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                      formik.touched.age && formik.errors.age ? 'border-red-500' : 'border-slate-600'
                    }`}
                    placeholder='25'
                  />
                  {formik.touched.age && formik.errors.age && (
                    <p className='text-red-400 text-xs mt-1'>{formik.errors.age}</p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-semibold text-slate-300 mb-2'>Gender</label>
                  <select
                    id='gender'
                    {...formik.getFieldProps('gender')}
                    className={`w-full bg-slate-700 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                      formik.touched.gender && formik.errors.gender ? 'border-red-500' : 'border-slate-600'
                    }`}
                  >
                    <option value=''>Select Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender && (
                    <p className='text-red-400 text-xs mt-1'>{formik.errors.gender}</p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className='block text-sm font-semibold text-slate-300 mb-2'>Skills</label>
                <Select
                  id='skills'
                  name='skills'
                  isMulti
                  options={skillOptions}
                  styles={customSelectStyles}
                  value={skillOptions.filter((option) => formik.values.skills.includes(option.value))}
                  onChange={(selectedOptions) => {
                    const values = selectedOptions.map((option) => option.value);
                    formik.setFieldValue('skills', values);
                  }}
                  onBlur={() => formik.setFieldTouched('skills', true)}
                  placeholder='Select your skills...'
                />
              </div>

              {/* About */}
              <div>
                <label className='block text-sm font-semibold text-slate-300 mb-2'>About Me</label>
                <textarea
                  id='about'
                  {...formik.getFieldProps('about')}
                  className={`w-full bg-slate-700 border rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none ${
                    formik.touched.about && formik.errors.about ? 'border-red-500' : 'border-slate-600'
                  }`}
                  rows={5}
                  placeholder='Tell us about yourself...'
                />
                <div className='text-xs text-slate-400 mt-1'>{formik.values.about.length}/500 characters</div>
                {formik.touched.about && formik.errors.about && (
                  <p className='text-red-400 text-xs mt-1'>{formik.errors.about}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={formik.isSubmitting}
                className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105 disabled:hover:scale-100'
              >
                {formik.isSubmitting ? (
                  <span className='flex items-center justify-center gap-2'>
                    <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                        fill='none'
                      />
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      />
                    </svg>
                    Saving Changes...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
