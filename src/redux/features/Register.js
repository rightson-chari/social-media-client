import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: true,
    data: "",
    success: false,
    error: "",
};

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async(user) => {
        // return axios.post("/auth/register", user).then((res) => res);
        return fetch("auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then((res) => res.json());
    }
);

const registerSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.success = false;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = "";
            if (state.data.includes("registered")) {
                state.success = true;
                console.log(state.success);
            }
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.data = "";
            state.success = false;
        });
    },
});
export default registerSlice.reducer;