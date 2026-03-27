import axios from 'axios';
import { toast } from 'react-toastify';
import { VITE_API_BASE_URL } from '../../constants/common';
import { useDispatch, useSelector } from 'react-redux';
import { setRequest } from '../../store/appSlices/requestSlice';
import { useEffect } from 'react';
import { Loader } from '../../components';
import RequestCard from './RequestCard';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);
  const requestRecieved = async () => {
    try {
      const response = await axios.get(VITE_API_BASE_URL + 'api/user/requests/recieved', { withCredentials: true });
      if (!response.data) {
        throw new Error('No Response Recieved');
      }

      dispatch(setRequest(response.data.data));
    } catch (error) {
      console.error(error.message);
      toast.error(`Error while fetching requests: ${error.response}`);
    }
  };

  useEffect(() => {
    requestRecieved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!requests) {
    return <Loader />;
  } else if (requests.length === 0) {
    return (
      <div className='h-full min-h-[400px] flex flex-col items-center justify-center gap-5 p-6 text-center'>
        <div className='w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center text-4xl'>📭</div>
        <div>
          <h1 className='text-2xl font-bold text-[color:var(--text-primary)]'>No requests yet</h1>
          <p className='text-[color:var(--text-secondary)] mt-2 max-w-xs'>
            When developers send you connection requests, they&apos;ll appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 sm:p-8 max-w-2xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-[color:var(--text-primary)]'>Connection Requests</h1>
        <p className='text-[color:var(--text-secondary)] mt-1 text-sm'>
          {requests.length} pending request{requests.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className='space-y-3'>
        {requests.map((request) => (
          <RequestCard key={request._id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default Requests;
