import { Link } from 'react-router-dom';
import { Code2, ArrowLeft } from 'lucide-react';

const PolicyLayout = ({ title, lastUpdated, children }) => {
  return (
    <div className='min-h-screen flex flex-col bg-[color:var(--bg-primary)] text-[color:var(--text-primary)]'>
      {/* Header */}
      <header className='sticky top-0 z-50 border-b border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4'>
          <Link
            to='/'
            className='flex items-center gap-1.5 text-[color:var(--text-tertiary)] hover:text-[color:var(--text-primary)] transition-colors text-sm'
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Link>
          <div className='h-5 w-px bg-[color:var(--border-color)]' />
          <Link to='/' className='flex items-center gap-2'>
            <div className='bg-gradient-to-br from-rose-500 to-pink-600 p-1.5 rounded-lg'>
              <Code2 size={16} className='text-white' />
            </div>
            <span className='font-bold text-sm tracking-wide'>DevTinder</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className='flex-1'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 py-10'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold mb-2'>{title}</h1>
            {lastUpdated && <p className='text-[color:var(--text-tertiary)] text-sm'>Last updated: {lastUpdated}</p>}
          </div>
          <div className='prose-policy'>{children}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className='border-t border-[color:var(--border-color)] bg-[color:var(--bg-secondary)]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-[color:var(--text-tertiary)] text-xs'>
            © {new Date().getFullYear()} DevTinder. All rights reserved.
          </p>
          <nav className='flex flex-wrap items-center justify-center gap-x-4 gap-y-1'>
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
    </div>
  );
};

export default PolicyLayout;
