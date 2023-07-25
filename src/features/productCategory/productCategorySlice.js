import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productCategoryService from "./productCategoryService";

export const getProductCategories = createAsyncThunk('productCategory/get-categories', async (thunkAPI) => {
    try {
        return await productCategoryService.getProductCategories();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createProductCategory = createAsyncThunk("category/create-product-category", async (productCategoryData, thunkAPI) => {
    try {
      return await productCategoryService.createProductCategory(productCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

const initialState = {
    productCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const productCategorySlice = createSlice({
    name: "productCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductCategories.pending, (state) => {
            state.isLoading = true;
        }).addCase(getProductCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.productCategories = action.payload;
        }).addCase(getProductCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(createProductCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(createProductCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdProductCategory = action.payload;
        }).addCase(createProductCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        }).addCase(resetState, () => initialState);
    },
})

export default productCategorySlice.reducer;