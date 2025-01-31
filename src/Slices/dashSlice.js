import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DEVICEANDANIMAL } from '../api/api';

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
export const DashSlice = createSlice({
    name: 'dashSlice',
    initialState: {
        status: "",
        loading: false,

        response: "",
        dash_error: null,

    },
    reducers: {
        clearError: (state) => {
            state.dash_error = null;
        },
        clearResponse: (state) => {
            state.response = "";
        },
    },
    extraReducers: (builder) => {
        builder
            //Device and Animal
            .addCase(DeviceAndAnimal.pending, (state) => {
                state.status = "Loading...";
                state.loading = true;
            })
            .addCase(DeviceAndAnimal.fulfilled, (state, { payload }) => {
                state.status = "Success";
                state.loading = false;
                state.response = payload;
                state.dash_error = null;
            })
            .addCase(DeviceAndAnimal.rejected, (state, { payload }) => {
                state.status = "Failed";
                state.loading = false;
                state.dash_error = payload;
            })
    },
});

// Export actions
export const { clearError, clearResponse } = DashSlice.actions;

export default DashSlice.reducer;
