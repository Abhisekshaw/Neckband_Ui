import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../Slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer, 
  },
});
