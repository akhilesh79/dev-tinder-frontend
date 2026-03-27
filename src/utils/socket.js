import { io } from 'socket.io-client';
import { VITE_API_BASE_URL } from '../constants/common';

let socketInstance = null;

export const createSocketConnection = () => {
  if (!socketInstance) {
    socketInstance = io(VITE_API_BASE_URL.replace('/api', ''), {
      withCredentials: true,
    });
  }

  return socketInstance;
};

export const disconnectSocketConnection = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};
