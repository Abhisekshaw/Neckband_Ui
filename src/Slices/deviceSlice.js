import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GETDEVICE, DEVICEANDANIMAL } from '../api/api';

// Thunk to fetch EnergyMeter data
export const GetDevice = createAsyncThunk(
    'GetDevice',
    async ({ data, header }, { rejectWithValue }) => {
        try {
            const response = await GETDEVICE(data, header);
            return response.data;
        } catch (error) {
            if (
                error.response.data.message === 'Invalid token' ||
                error.response.data.message === 'Access denied'
            ) {
                window.localStorage.clear();
                window.location.href = './';
            }
            return rejectWithValue(error.response.data);
        }
    }
);

// Device Slice
export const DeviceSlice = createSlice({
    name: 'deviceSlice',
    initialState: {
        status: "",
        device_loading: false,

        device_response: "",
        device_error: null,

    },
    reducers: {
        clearError: (state) => {
            state.device_error = null;
        },
        clearResponse: (state) => {
            state.device_response = "";
        },
    },
    extraReducers: (builder) => {
        builder
            //Get Dveice
            .addCase(GetDevice.pending, (state) => {
                state.status = "Loading...";
                state.device_loading = true;
            })
            .addCase(GetDevice.fulfilled, (state, { payload }) => {
                state.status = "Success";
                state.device_loading = false;
                state.device_response = payload;
                state.device_error = null;
            })
            .addCase(GetDevice.rejected, (state, { payload }) => {
                state.status = "Failed";
                state.device_loading = false;
                state.device_error = payload;
            })
    },
});

// Export actions
export const { clearError, clearResponse } = DeviceSlice.actions;

export default DeviceSlice.reducer;
