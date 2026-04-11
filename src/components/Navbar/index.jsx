import { useState, useContext } from 'react';
import { Heart, Moon, Sun, Menu, X, Users, Bell, User, LogOut, Compass, Crown, CheckCircle2 } from 'lucide-react';
import { ThemeContext } from '../../context/themeContext';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearUser } from '../../store/appSlices/userSlice';
import { disconnectSocketConnection } from '../../utils/socket';
import { getImageUrl } from '../../utils/getImageUrl';
import { useLogoutMutation } from './apiSlice';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [handleLogout] = useLogoutMutation();

  const handleLogoutUser = async () => {
    try {
      const response = await handleLogout().unwrap();
      disconnectSocketConnection();
      dispatch(clearUser());
      navigate('/login');
      toast.success(response.data?.message || 'Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error(error.response?.data?.message || 'Logout failed. Please try again.');
    }
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Discover', icon: <Compass size={15} /> },
    { to: '/user-connections', label: 'Connections', icon: <Users size={15} /> },
    { to: '/user-requests', label: 'Requests', icon: <Bell size={15} /> },
    { to: '/profile', label: 'Profile', icon: <User size={15} /> },
  ];

  const isPremiumActive = location.pathname === '/premium';
  const isMember = !!user?.isPremiumUser;
  const memberTierLabel = user?.mememberShipType
    ? user.mememberShipType.charAt(0).toUpperCase() + user.mememberShipType.slice(1).toLowerCase()
    : 'Member';

  return (
    <header className='shrink-0 sticky top-0 z-50 border-b border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]/90 backdrop-blur-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex h-16 items-center justify-between gap-4'>
          {/* Logo */}
          <Link to='/' className='flex items-center gap-2 group flex-shrink-0'>
            <Heart className='w-6 h-6 text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform duration-200' />
            <span className='text-xl font-bold font-poppins bg-gradient-to-r from-rose-500 to-indigo-500 bg-clip-text text-transparent'>
              DevTinder
            </span>
          </Link>

          {/* Desktop Nav */}
          {user && (
            <nav className='hidden md:flex items-center gap-1 flex-1 justify-center'>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.to)
                      ? 'bg-indigo-500/10 text-indigo-500'
                      : 'text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)]'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              {/* Premium link — adapts to membership state */}
              <Link
                to='/premium'
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isMember
                    ? isPremiumActive
                      ? 'bg-yellow-400/20 text-yellow-500'
                      : 'text-yellow-500 hover:bg-yellow-400/10'
                    : isPremiumActive
                      ? 'bg-gradient-to-r from-yellow-400/20 to-amber-400/20 text-yellow-500'
                      : 'text-yellow-500 hover:bg-yellow-400/10'
                }`}
              >
                {isMember ? (
                  <>
                    <Crown size={14} className='fill-yellow-500' />
                    {memberTierLabel}
                    <CheckCircle2 size={11} className='text-emerald-400' />
                  </>
                ) : (
                  <>
                    <Crown size={14} className='fill-yellow-500' />
                    Premium
                  </>
                )}
              </Link>
            </nav>
          )}

          {/* Right actions */}
          <div className='flex items-center gap-1 flex-shrink-0'>
            {/* Theme toggle */}
            <button
              type='button'
              onClick={toggleTheme}
              aria-label='Toggle theme'
              className='p-2 rounded-lg text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)] transition-all duration-200'
            >
              {theme === 'dark' ? (
                <Sun size={18} className='text-amber-400' />
              ) : (
                <Moon size={18} className='text-indigo-500' />
              )}
            </button>

            {user ? (
              <>
                {/* Avatar dropdown */}
                <div className='dropdown dropdown-end'>
                  <div
                    tabIndex={0}
                    role='button'
                    className='flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[color:var(--bg-primary)] transition-all duration-200 cursor-pointer'
                  >
                    <div className='w-8 h-8 rounded-full overflow-hidden ring-2 ring-indigo-500/40 flex-shrink-0'>
                      <img
                        src={getImageUrl(user.profileImage)}
                        alt={user.firstName}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <span className='hidden sm:block text-sm font-medium text-[color:var(--text-primary)] max-w-[90px] truncate'>
                      {user.firstName}
                    </span>
                  </div>
                  <ul
                    tabIndex={0}
                    className='menu menu-sm dropdown-content mt-2 p-2 shadow-xl bg-[color:var(--bg-secondary)] border border-[color:var(--border-color)] rounded-xl w-56 z-50'
                  >
                    <li className='px-3 py-1.5 pointer-events-none'>
                      <span className='font-semibold text-[color:var(--text-primary)] text-sm normal-case'>
                        {user.firstName} {user.lastName}
                      </span>
                    </li>
                    <div className='my-1 h-px bg-[color:var(--border-color)]'></div>
                    {navLinks.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className={`flex items-center gap-2 rounded-lg ${
                            isActive(link.to)
                              ? 'text-indigo-500 bg-indigo-500/10'
                              : 'text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]'
                          }`}
                        >
                          {link.icon} {link.label}
                        </Link>
                      </li>
                    ))}
                    <div className='my-1 h-px bg-[color:var(--border-color)]'></div>
                    <li>
                      <button
                        onClick={handleLogoutUser}
                        className='flex w-full items-center gap-2 rounded-lg text-red-500 hover:bg-red-500/10 hover:text-red-500'
                      >
                        <LogOut size={15} /> Logout
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Mobile hamburger */}
                <button
                  type='button'
                  className='md:hidden p-2 rounded-lg text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-primary)] transition-all duration-200'
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label='Toggle menu'
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </>
            ) : (
              <Link
                to='/login'
                className='px-4 py-2 text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all duration-200'
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {user && mobileOpen && (
        <div className='md:hidden border-t border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] px-4 py-3 space-y-1 animate-fade-up'>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(link.to)
                  ? 'bg-indigo-500/10 text-indigo-500'
                  : 'text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-primary)] hover:text-[color:var(--text-primary)]'
              }`}
            >
              {link.icon} {link.label}
            </Link>
          ))}
          <Link
            to='/premium'
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              isPremiumActive ? 'bg-yellow-400/15 text-yellow-500' : 'text-yellow-500 hover:bg-yellow-400/10'
            }`}
          >
            <Crown size={15} className='fill-yellow-500' />
            {isMember ? (
              <span className='flex items-center gap-1.5'>
                {memberTierLabel} <CheckCircle2 size={12} className='text-emerald-400' />
              </span>
            ) : (
              'Premium'
            )}
          </Link>
          <div className='pt-2 border-t border-[color:var(--border-color)]'>
            <button
              onClick={handleLogoutUser}
              className='flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 w-full transition-all'
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
