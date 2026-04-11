import apiSlice from '../../store/appSlices/apiSlice';

const navbarApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: (body = {}) => {
        return {
          url: 'api/auth/logout',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['User'], // Invalidate the 'User' tag to trigger refetching of user data after logout
    }),
  }),
});

export const { useLogoutMutation } = navbarApiSlice;
