const Loader = () => (
  <div className='h-full min-h-[400px] flex flex-col items-center justify-center gap-3'>
    <span className='loading loading-ring loading-lg text-indigo-500'></span>
    <p className='text-sm text-[color:var(--text-tertiary)] animate-pulse'>Loading...</p>
  </div>
);

export default Loader;
