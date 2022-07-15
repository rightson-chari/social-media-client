import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const stringUser = localStorage.getItem("user");

let savedUser = "";
if (stringUser !== undefined) {
    savedUser = JSON.parse(stringUser);
}
const initialState = {
    loading: "",
    user: "",
    error: "",
};

export const loginUser = createAsyncThunk("login/loginUser", async(user) => {
    return axios.post("/auth/login", user).then((res) => res.data);
});

const loginSlices = createSlice({
    name: "login",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = "";
            localStorage.setItem("token", state.user.token);
            localStorage.setItem("user", JSON.stringify(state.user.user));
            window.location.reload();
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = "";
            state.error = action.error;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        });
    },
});
export default loginSlices.reducer;