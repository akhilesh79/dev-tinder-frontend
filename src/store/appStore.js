import { configureStore } from '@reduxjs/toolkit';
import userReducer from './appSlices/userSlice';
import feedReducer from './appSlices/feedSlice';
import connectionReducer from './appSlices/connectionSlice';
import requestReducer from './appSlices/requestSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});

export default appStore;
