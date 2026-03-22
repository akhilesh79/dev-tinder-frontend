import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
  name: 'requests',
  initialState: null,
  reducers: {
    setRequest: (state, action) => {
      return action.payload;
    },
    clearRequest: (state, action) => {
      const requestIdToClear = action.payload;
      return state.filter((request) => request._id !== requestIdToClear);
    },
  },
});

export const { setRequest, clearRequest } = requestSlice.actions;
export default requestSlice.reducer;
