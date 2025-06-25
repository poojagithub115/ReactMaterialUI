import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";
import { userApi } from "api/userApi";
export const Store = configureStore({
    reducer: {
        // user: userReducer
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
})