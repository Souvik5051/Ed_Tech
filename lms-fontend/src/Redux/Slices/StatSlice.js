import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axoisInstance from "../../Helpers/axiosInstance";

const initialState = {
    allUsersCount: 0,
    subscribedCount: 0
};

// Fetch all users count
export const getStatsData = createAsyncThunk("stats/getUsers", async () => {
    try {
        const response = await axoisInstance.get("/admin/stats/users");
        console.log(response.data);

        return response.data.count; // Return the count directly
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch user stats");
        throw error;
    }
});

// Fetch subscribed users count
export const getStatPaymentData = createAsyncThunk("stats/getPaymentUsers", async () => {
    try {
        const response = await axoisInstance.get("/admin/stats/paymentUser");
        console.log(response.data);
         
        return response.data.count; // Return the count directly
    } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch payment stats");
        throw error; 
    }
});

const statSlice = createSlice({
    name: "stat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
           
            .addCase(getStatsData.fulfilled, (state, action) => {
                state.allUsersCount = action.payload;
            })
           
            .addCase(getStatPaymentData.fulfilled, (state, action) => {
                state.subscribedCount = action.payload; 
            });
    }
});

export default statSlice.reducer;
