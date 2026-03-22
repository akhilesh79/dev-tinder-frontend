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
      const response = await axios.get(VITE_API_BASE_URL + '/api/user/requests/recieved', { withCredentials: true });
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
      <div className='flex justify-center items-center' style={{ height: 'calc(100vh - 132px)' }}>
        <h1 className='text-2xl font-bold'>No Requests Found</h1>
      </div>
    );
  }

  return (
    <div className='overflow-auto p-6 max-w-2xl mx-auto' style={{ height: 'calc(100vh - 132px)' }}>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold'>Connection Requests</h1>
      </div>

      <div className='space-y-4'>
        {requests.map((request) => (
          <RequestCard key={request._id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default Requests;
