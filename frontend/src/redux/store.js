import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import menueReducer from './menueitemSlice'

export const store=configureStore({
    reducer:{
        userReducer:userReducer,
        menueReducer:menueReducer
    }
})