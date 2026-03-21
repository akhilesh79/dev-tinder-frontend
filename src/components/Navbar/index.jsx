import { useContext } from 'react';
import { Heart, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div className='navbar bg-base-300 shadow-sm p-0.5'>
        <div className='flex-1'>
          <a className='btn btn-ghost text-xl'>
            <Heart className='w-6 h-6 text-red-500' />
            DevTinder
          </a>
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
          <div className='dropdown dropdown-end mx-3'>
            <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <img
                  alt='Tailwind CSS Navbar component'
                  src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                />
              </div>
            </div>
            <ul
              tabIndex='-1'
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                <a className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
