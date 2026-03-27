import { io } from 'socket.io-client';
import { VITE_API_BASE_URL } from '../constants/common';

export const createSocketConnection = () => {
  const socket = io(VITE_API_BASE_URL.replace('/api', ''), {
    withCredentials: true,
  });
  return socket;
};
