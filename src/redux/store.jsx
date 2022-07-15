import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/Register";
import loginSlice from "./features/loginSlice";
const store = configureStore({
  reducer: {
    login: loginSlice,
    register: registerSlice,
  },
});
export default store;
