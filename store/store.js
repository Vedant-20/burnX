import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import messagesSlice from "./messagesSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    messages: messagesSlice,
  },
});

export default store;
