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
      const response = await axios.get(VITE_API_BASE_URL + '/user/connections', { withCredentials: true });
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
      <div className='overflow-auto flex justify-center items-center' style={{ height: 'calc(100vh - 132px)' }}>
        <h1 className='text-2xl font-bold'>No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className='overflow-auto flex flex-col items-center gap-4' style={{ height: 'calc(100vh - 132px)' }}>
      <h1 className='text-2xl font-bold my-10'>Connections</h1>
      {connections.map((connection) => (
        <ConnectionCard key={connection._id} connection={connection} />
      ))}
    </div>
  );
};

export default UserConnections;
