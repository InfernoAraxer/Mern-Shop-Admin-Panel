import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

export const getEnquiries = createAsyncThunk('enquiry/get-enquiries', async (thunkAPI) => {
    try {
        return await enquiryService.getEnquiries();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteAnEnquiry = createAsyncThunk('color/delete-enquiry', async (id, thunkAPI) => {
    try {
        return await enquiryService.deleteAnEnquiry(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getAnEnquiry = createAsyncThunk('color/get-enquiry', async (id, thunkAPI) => {
    try {
        return await enquiryService.getAnEnquiry(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const updateAnEnquiry = createAsyncThunk('color/update-enquiry', async (id, thunkAPI) => {
    try {
        return await enquiryService.updateAnEnquiry(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})


export const resetState = createAction('Reset_all');

const initialState = {
    enquiries: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const enquirySlice = createSlice({
    name: "enquiries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEnquiries.pending, (state) => {
            state.isLoading = true;
        }).addCase(getEnquiries.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.enquiries = action.payload;
        }).addCase(getEnquiries.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(deleteAnEnquiry.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteAnEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedEnquiry = action.payload;
        }).addCase(deleteAnEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(getAnEnquiry.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAnEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.enquiryName = action.payload.name;
            state.enquiryMobile = action.payload.mobile;
            state.enquiryEmail = action.payload.email;
            state.enquiryComment = action.payload.comment;
            state.enquiryStatus = action.payload.status;
        }).addCase(getAnEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(updateAnEnquiry.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateAnEnquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedEnquiry = action.payload;
        }).addCase(updateAnEnquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(resetState, () => initialState);
    },
})

export default enquirySlice.reducer;