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

export const DeviceAndAnimal = createAsyncThunk(
    'DeviceAndAnimal',
    async ({ data, header }, { rejectWithValue }) => {
        try {
            const response = await DEVICEANDANIMAL(data, header);
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

// EnergyMeter Slice
export const DeviceSlice = createSlice({
    name: 'deviceSlice',
    initialState: {
        status: "",
        loading: false,

        response: "",
        error: null,

    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearResponse: (state) => {
            state.response = "";
        },
    },
    extraReducers: (builder) => {
        builder
            //Get Dveice
            .addCase(GetDevice.pending, (state) => {
                state.status = "Loading...";
                state.loading = true;
            })
            .addCase(GetDevice.fulfilled, (state, { payload }) => {
                state.status = "Success";
                state.loading = false;
                state.response = payload;
                state.bypass_error = null;
            })
            .addCase(GetDevice.rejected, (state, { payload }) => {
                state.status = "Failed";
                state.loading = false;
                state.error = payload;
            })

            //Device and Animal
            .addCase(DeviceAndAnimal.pending, (state) => {
                state.status = "Loading...";
                state.loading = true;
            })
            .addCase(DeviceAndAnimal.fulfilled, (state, { payload }) => {
                state.status = "Success";
                state.loading = false;
                state.response = payload;
                state.bypass_error = null;
            })
            .addCase(DeviceAndAnimal.rejected, (state, { payload }) => {
                state.status = "Failed";
                state.loading = false;
                state.error = payload;
            })
    },
});

// Export actions
export const { clearError, clearResponse } = DeviceSlice.actions;

export default DeviceSlice.reducer;
