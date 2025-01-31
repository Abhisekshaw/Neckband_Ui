import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../Slices/authSlice";
import { DeviceSlice } from "../Slices/deviceSlice";
import { DashSlice } from "../Slices/dashSlice";

export const store = configureStore({
  reducer: {
    authSlice: AuthSlice.reducer, 
    deviceSlice: DeviceSlice.reducer,
    dashSlice: DashSlice.reducer,
  },
});
