// src/components/store/slices/marketplaceSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "../../api/apiConfig";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  products: [],
  status: {
    fetch: "idle",
    create: "idle",
  },
  error: {
    fetch: null,
    create: null,
  },
};

export const fetchProducts = createAsyncThunk(
  "marketplace/fetchProducts",
  async () => {
    try {
      const response = await axiosInstance.get(API_ROUTES.posts); // Adjust the route as needed
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createProduct = createAsyncThunk(
  "marketplace/createProduct",
  async (data) => {
    try {
      const response = await axiosInstance.post(API_ROUTES.posts, data); // Adjust the route as needed
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status.fetch = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status.fetch = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status.fetch = "failed";
        state.error.fetch = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.status.create = "loading";
        state.error.create = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status.create = "failed";
        state.error.create = action.error.message;
      });
  },
});

export const selectProducts = (state) => state.marketplace.products;
export const selectMarketplaceStatus = (state) => state.marketplace.status;
export const selectMarketplaceErrors = (state) => state.marketplace.error;

export default marketplaceSlice.reducer;
