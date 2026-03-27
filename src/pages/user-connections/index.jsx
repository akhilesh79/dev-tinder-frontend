import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { VITE_API_BASE_URL } from '../../constants/common';
import { useDispatch, useSelector } from 'react-redux';
import { setConnections } from '../../store/appSlices/connectionSlice';
import { Loader } from '../../components';
import ConnectionCard from './ConnectionCard';

const UserConnections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(VITE_API_BASE_URL + 'api/user/connections', { withCredentials: true });
      if (!response.data) {
        throw new Error('No Response Recieved');
      }

      dispatch(setConnections(response.data.data));
    } catch (error) {
      console.error(error.message);
      toast.error(`Error while fetching connections: ${error.response}`);
    }
  };

  if (!connections) {
    return <Loader />;
  }

  if (connections.length === 0) {
    return (
      <div className='h-full min-h-[400px] flex flex-col items-center justify-center gap-5 p-6 text-center'>
        <div className='w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center text-4xl'>🤝</div>
        <div>
          <h1 className='text-2xl font-bold text-[color:var(--text-primary)]'>No connections yet</h1>
          <p className='text-[color:var(--text-secondary)] mt-2 max-w-xs'>
            Start discovering developers and send connection requests to grow your network!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 sm:p-8 max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-[color:var(--text-primary)]'>Your Connections</h1>
        <p className='text-[color:var(--text-secondary)] mt-1 text-sm'>
          {connections.length} developer{connections.length !== 1 ? 's' : ''} in your network
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {connections.map((connection) => (
          <ConnectionCard key={connection._id} connection={connection} />
        ))}
      </div>
    </div>
  );
};

export default UserConnections;
