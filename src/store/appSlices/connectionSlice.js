import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
  name: 'connections',
  initialState: null,
  reducers: {
    setConnections: (state, action) => action.payload,
    removeConnections: () => {
      return null;
    },
    updateConnectionPresence: (state, action) => {
      if (!state) {
        return state;
      }

      const { userId, isOnline, lastSeen } = action.payload;
      return state.map((connection) =>
        connection._id === userId ? { ...connection, isOnline, lastSeen } : connection,
      );
    },
    updateConnectionUnread: (state, action) => {
      if (!state) {
        return state;
      }

      const { userId, unreadCount } = action.payload;
      return state.map((connection) => (connection._id === userId ? { ...connection, unreadCount } : connection));
    },
  },
});

export const { setConnections, removeConnections, updateConnectionPresence, updateConnectionUnread } =
  connectionSlice.actions;
export default connectionSlice.reducer;
