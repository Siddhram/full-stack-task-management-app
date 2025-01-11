import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import frontendurl from "../url";
export const createmenue=createAsyncThunk('createmenue',async(data,{rejectWithValue})=>{
    try {
        const res= await axios.post(`${frontendurl()}/menu/`,data);
        return res.data;
        
    } catch (error) {
                return rejectWithValue(error)

    }
})
export const getemenue=createAsyncThunk('getemenue',async(_,{rejectWithValue})=>{
    try {
        const res= await axios.get(`${frontendurl()}/menu/`);
        return res.data;
        
    } catch (error) {
                return rejectWithValue(error)

    }
})
const initialState={
    allmenueItems:[],
    addtocart:[]
}
const menueItemsall=createSlice({
     name:"menueItemsall",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.addtocart.find(cartItem => cartItem._id === item._id);

            if (existingItem) {
                existingItem.quantity += 1; // Increment quantity if item exists
            } else {
                state.addtocart.push({ ...item, quantity: 1 }); // Add new item with quantity 1
            }

            state.totalPrice = state.addtocart.reduce(
                (total, cartItem) => total + cartItem.price * cartItem.quantity,
                0
            );
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.addtocart = state.addtocart.filter(cartItem => cartItem._id !== itemId);

            state.totalPrice = state.addtocart.reduce(
                (total, cartItem) => total + cartItem.price * cartItem.quantity,
                0
            );
        },
        calculateTotalPrice: (state) => {
            state.totalPrice = state.addtocart.reduce(
                (total, cartItem) => total + cartItem.price * cartItem.quantity,
                0
            );
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createmenue.fulfilled,(state,action)=>{
            state.allmenueItems.push(action.payload);
        })
        builder.addCase(getemenue.fulfilled,(state,action)=>{
            state.allmenueItems=action.payload;
        })
    }

})
export const { addToCart, removeFromCart, calculateTotalPrice } = menueItemsall.actions;

export default menueItemsall.reducer;