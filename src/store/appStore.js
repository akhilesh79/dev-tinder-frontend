import { configureStore } from '@reduxjs/toolkit';
import userReducer from './appSlices/userSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default appStore;
