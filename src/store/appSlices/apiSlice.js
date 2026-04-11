import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { VITE_API_BASE_URL } from '../../constants/common';

const configureBaseQuery = async (args, api, extraOptions) => {
  const baseResult = await fetchBaseQuery({
    baseUrl: VITE_API_BASE_URL,
    credentials: 'include',
  })(args, api, extraOptions);

  return baseResult;
};

const apiSlice = createApi({
  baseQuery: configureBaseQuery,
  endpoints: () => ({}),
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds before garbage collection
  refetchOnMountOrArgChange: 30, // Refetch data if it's older than 30 seconds when component remounts
  tagTypes: ['User', 'Profile', 'Request'],
});

export default apiSlice;
