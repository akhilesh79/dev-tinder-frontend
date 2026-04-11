import { configureStore } from '@reduxjs/toolkit';
import userReducer from './appSlices/userSlice';
import feedReducer from './appSlices/feedSlice';
import connectionReducer from './appSlices/connectionSlice';
import requestReducer from './appSlices/requestSlice';
import apiSlice from './appSlices/apiSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default appStore;
