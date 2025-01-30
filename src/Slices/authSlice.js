import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REGISTER, LOGIN } from "../api/api";

export const userLogin = createAsyncThunk(
    "/login",
    async ({ data, navigate }, { rejectWithValue }) => {
        try {
            const response = await LOGIN(data);
            if (response?.data?.success === true) {
                window.localStorage.setItem("token", response.data.token);
                window.localStorage.setItem("loggedIn", true);
                navigate("/home");
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    loginData: null,
    status: "",
    error: null,
    loading: false,
};

//   create Slice
export const AuthSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        // Logout reducer
        doLogout: (state) => {
            window.localStorage.clear();
            state.token = "";
        },
        clearError: (state) => {
            state.error = null;
        },
        clearLoginData: (state) => {
            state.loginData = null;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(userLogin.pending, (state, { payload }) => {
            // Add user to the state array
            state.status = "Loading...";
            state.loading = true;
        });

        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            // Add user to the state array
            state.status = "Success";
            state.loading = false;
            state.loginData = payload;
        });
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            // Add user to the state array
            state.status = "Failed";
            state.loading = false;
            state.error = payload;
        });
    },
});

export const { doLogout, clearLoginData, clearError } = AuthSlice.actions;
export default AuthSlice.reducer;
