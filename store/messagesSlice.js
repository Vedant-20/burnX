import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  selectedConversation: {
    _id: "",
    userId: "",
    username: "",
    userProfilePic: "",
  },
  newConversation: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    conversationsUpdater: (state, action) => {
      state.conversations = action.payload;
    },

    selectedConversationUpdater: (state, action) => {
      state.selectedConversation = action.payload;
    },
    newConversationUpdater: (state, action) => {
      state.newConversation = action.payload;
    },
  },
});

export const {
  conversationsUpdater,
  selectedConversationUpdater,
  newConversationUpdater,
} = messagesSlice.actions;

export default messagesSlice.reducer;
