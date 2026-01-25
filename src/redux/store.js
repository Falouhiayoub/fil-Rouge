import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import createReducer from "./slices/cartSlice";
import productReducer from './slices/productSlice';


export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: createReducer,
        auth: authReducer,
    },
});