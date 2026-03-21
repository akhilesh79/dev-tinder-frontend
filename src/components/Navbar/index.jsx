import { useContext } from 'react';
import { Heart, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { VITE_API_BASE_URL } from '../../constants/common';
import { toast } from 'react-toastify';
import { clearUser } from '../../store/appSlices/userSlice';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await axios.post(VITE_API_BASE_URL + '/api/auth/logout', {}, { withCredentials: true });
      if (!response.data) {
        throw new Error('No response data received');
      }

      dispatch(clearUser());
      navigate('/login');
      toast.success(response.data.message);
    } catch (error) {
      console.error('Logout failed:', error);
      const errorMessage = error.response?.data?.message || 'Logout failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className='navbar bg-base-300 shadow-sm p-0.5'>
        <div className='flex-1'>
          <Link to='/' className='btn btn-ghost text-xl'>
            <Heart className='w-6 h-6 text-red-500' />
            DevTinder
          </Link>
        </div>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={toggleTheme}
            aria-label='Toggle dark mode'
            className='btn btn-ghost btn-square'
          >
            {theme === 'dark' ? (
              <Sun className='w-5 h-5 text-yellow-300' />
            ) : (
              <Moon className='w-5 h-5 text-blue-600' />
            )}
          </button>

          {user && (
            <div className='flex items-center'>
              <div>Welcome, {user.firstName}</div>
              <div className='dropdown dropdown-end'>
                <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
                  <div className='w-10 rounded-full'>
                    <img alt='user' src={user.profileImage} />
                  </div>
                </div>
                <ul
                  tabIndex='-1'
                  className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
                >
                  <li>
                    <Link to='/profile' className='justify-between'>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className='justify-between'>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
