import axios from 'axios';
import { VITE_API_BASE_URL } from '../../constants/common';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFeed } from '../../store/appSlices/feedSlice';
import { toast } from 'react-toastify';
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
      const response = await axios.get(VITE_API_BASE_URL + '/api/user/feeds', { withCredentials: true });
      if (!response.data) {
        throw new Error('No response data received');
      }

      dispatch(setFeed(response.data.docs));
    } catch (error) {
      console.error('Error fetching feeds:', error);
      toast.error(`Failed to fetch feeds: ${error.response.message}`);
    }
  };

  if (!feed) return <Loader />;

  if (!feed?.length) {
    return (
      <div className='flex justify-center items-center' style={{ height: 'calc(100vh - 132px)' }}>
        <h1 className='text-2xl font-bold'>No Users Found</h1>
      </div>
    );
  }

  return (
    <>
      <div className='flex justify-center items-center' style={{ height: 'calc(100vh - 132px)' }}>
        <UserCard userFeed={feed?.[0] || {}} />
      </div>
    </>
  );
};

export default Feed;
