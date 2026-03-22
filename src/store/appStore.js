import { configureStore } from '@reduxjs/toolkit';
import userReducer from './appSlices/userSlice';
import feedReducer from './appSlices/feedSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default appStore;
