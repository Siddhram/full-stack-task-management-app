import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import frontendurl from "../url";
export const signupuser=createAsyncThunk('signupuser',async(data,{rejectWithValue})=>{
    try {
        const res= await axios.post(`${frontendurl()}/auth/register`,data);
        return res.data;
        
    } catch (error) {
                return rejectWithValue(error)

    }
})
export const signInuser=createAsyncThunk('signInuser',async(data,{rejectWithValue})=>{
    try {
        const res= await axios.post(`${frontendurl()}/auth/login`,data);
        return res.data;
        
    } catch (error) {
                return rejectWithValue(error)

    }
})
const initialState={
    isLoding:false,
    userData: JSON.parse(localStorage.getItem('user'))||null,
    error:null,
    message:""
}
const userSlice=createSlice({
    name:"userSlice",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(signupuser.pending,(state)=>{
            state.isLoding=true;
        })
        .addCase(signupuser.fulfilled,(state,action)=>{
            state.isLoding=false;
            localStorage.setItem('token',JSON.stringify(action.payload.token));
            state.message="user resister"
        })
         .addCase(signupuser.rejected,(state,action)=>{
        state.isLoding=false;
        state.error=action.payload.error;
                // state.error="Try again";

       });
       builder.addCase(signInuser.pending,(state)=>{
            state.isLoding=true;
        })
        .addCase(signInuser.fulfilled,(state,action)=>{
            state.isLoding=false;
            localStorage.setItem('token',JSON.stringify(action.payload.token));
            state.message="user login"
        })
         .addCase(signInuser.rejected,(state,action)=>{
        state.isLoding=false;
        state.error=action.payload.error;
       });
    }
})
export default userSlice.reducer;