import axios from 'axios';
import { VITE_API_BASE_URL } from '../../constants/common';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFeed } from '../../store/appSlices/feedSlice';
import UserCard from './UserCard';
import { Loader } from '../../components';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  useEffect(() => {
    fetchFeeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFeeds = async () => {
    try {
      const response = await axios.get(VITE_API_BASE_URL + '/user/feeds', { withCredentials: true });
      if (!response.data) {
        throw new Error('No response data received');
      }

      dispatch(setFeed(response.data.docs));
    } catch (error) {
      console.error('Error fetching feeds:', error);
    }
  };

  if (!feed) return <Loader />;

  if (!feed?.length) {
    return (
      <div className='h-full min-h-[400px] flex flex-col items-center justify-center gap-5 p-6 text-center'>
        <div className='w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center text-4xl'>👨‍💻</div>
        <div>
          <h1 className='text-2xl font-bold text-[color:var(--text-primary)]'>You&apos;re all caught up!</h1>
          <p className='text-[color:var(--text-secondary)] mt-2 max-w-xs'>
            No more developers to discover right now. Check back later for new matches!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full min-h-[400px] flex items-center justify-center p-4'>
      <UserCard userFeed={feed?.[0] || {}} />
    </div>
  );
};

export default Feed;
