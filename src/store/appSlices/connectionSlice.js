import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
  name: 'connections',
  initialState: null,
  reducers: {
    setConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: () => {
      return null;
    },
  },
});

export const { setConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
