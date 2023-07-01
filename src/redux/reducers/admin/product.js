import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productServices from "../../services/admin/product";

const initialState = {
  products: [],
  shopProducts: [],
  product: null,
  searchProducts: [],
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data, thunkAPI) => {
    try {
      return await productServices.createProduct(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allProducts = createAsyncThunk(
  "products/allProducts",
  async (thunkAPI) => {
    try {
      return await productServices.allProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const shopProducts = createAsyncThunk(
  "products/shopProduct",
  async (shopId, thunkAPI) => {
    try {
      return await productServices.shopProducts(shopId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const singleProduct = createAsyncThunk(
  "products/singleProduct",
  async (prodId, thunkAPI) => {
    try {
      return await productServices.singleProduct(prodId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const setPublishedProducts = createAsyncThunk(
  "products/setPublishedProducts",
  async (prodId, thunkAPI) => {
    try {
      return await productServices.setPublishedProducts(prodId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data, thunkAPI) => {
    try {
      return await productServices.updateProduct(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateImageArray = createAsyncThunk(
  "products/updateImageArray",
  async (data, thunkAPI) => {
    try {
      return await productServices.updateImageArray(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (prodId, thunkAPI) => {
    try {
      return await productServices.deleteProduct(prodId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (param, thunkAPI) => {
    try {
      return await productServices.searchProduct(param);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(singleProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(shopProducts.fulfilled, (state, action) => {
        state.shopProducts = action.payload;
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.searchProducts = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = productSlice.actions;

export default productSlice.reducer;
