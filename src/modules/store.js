import { configureStore } from "@reduxjs/toolkit";
import userSlice from "redux/userSlice";
import logger from "redux-logger";
import modalSlice from "redux/modalSlice";

export const store = configureStore({
  reducer: {
    usersReducer: userSlice,
    modalReducer: modalSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
