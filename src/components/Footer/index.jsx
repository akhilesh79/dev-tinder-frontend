import { Heart } from 'lucide-react';

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
        <p className='text-[color:var(--text-tertiary)] text-xs tracking-wide'>Connect · Collaborate · Code</p>
      </div>
    </footer>
  );
};

export default Footer;
