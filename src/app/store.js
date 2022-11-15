import { configureStore } from "@reduxjs/toolkit";
import activeChatSlice from "../slices/activeChatSlice";
import userSlice from "../slices/userSlice";

export default configureStore({
  reducer: {
    userLoginInfo: userSlice,
    activeChatInfo: activeChatSlice
  },
});
