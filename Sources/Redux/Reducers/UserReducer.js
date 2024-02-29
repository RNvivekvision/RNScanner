import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const UserReducer = createSlice({
  name: 'UserReducer',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = UserReducer.actions;

export default UserReducer.reducer;
