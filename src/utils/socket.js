import { io } from 'socket.io-client';
import { VITE_API_BASE_URL } from '../constants/common';

let socketInstance = null;

export const createSocketConnection = () => {
  if (!socketInstance) {
    if (location.hostname === 'localhost') {
      socketInstance = io(VITE_API_BASE_URL.replace('/api', ''), {
        withCredentials: true,
      });
    } else {
      socketInstance = io('/', {
        path: '/socket.io',
        withCredentials: true,
      });
    }
  }

  return socketInstance;
};

export const disconnectSocketConnection = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};
