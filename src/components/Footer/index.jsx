import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='shrink-0 border-t border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2'>
        <div className='flex items-center gap-1.5 text-[color:var(--text-tertiary)] text-xs'>
          <span>Made with</span>
          <Heart size={12} className='text-rose-500 fill-rose-500' />
          <span>for developers</span>
          <span className='hidden sm:inline'>·</span>
          <span className='hidden sm:inline'>© {new Date().getFullYear()} DevTinder</span>
        </div>
        <p className='text-[color:var(--text-tertiary)] text-xs sm:hidden'>© {new Date().getFullYear()} DevTinder</p>
        <nav className='flex flex-wrap items-center justify-center gap-x-3 gap-y-1'>
          <Link
            to='/privacy-policy'
            className='text-[color:var(--text-tertiary)] hover:text-[color:var(--text-primary)] text-xs transition-colors'
          >
            Privacy Policy
          </Link>
          <span className='text-[color:var(--text-tertiary)] text-xs'>·</span>
          <Link
            to='/terms-of-service'
            className='text-[color:var(--text-tertiary)] hover:text-[color:var(--text-primary)] text-xs transition-colors'
          >
            Terms of Service
          </Link>
          <span className='text-[color:var(--text-tertiary)] text-xs'>·</span>
          <Link
            to='/refund-policy'
            className='text-[color:var(--text-tertiary)] hover:text-[color:var(--text-primary)] text-xs transition-colors'
          >
            Refund Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
