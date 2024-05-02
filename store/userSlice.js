import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userProfileUpdater: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userProfileUpdater } = userSlice.actions;

export default userSlice.reducer;
