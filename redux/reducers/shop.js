import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shopServices from "../services/shop";

const initialState = {
  shop: null,
  shops: [],
};

export const createShop = createAsyncThunk(
  "shop/createShop",
  async (data, thunkAPI) => {
    try {
      return await shopServices.createShop(data);
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

export const getShop = createAsyncThunk(
  "shop/getShop",
  async (userId, thunkAPI) => {
    try {
      return await shopServices.getShop(userId);
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

export const getShopDetails = createAsyncThunk(
  "shop/getShop",
  async (id, thunkAPI) => {
    try {
      return await shopServices.getShopDetails(id);
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

export const getAllShops = createAsyncThunk(
  "shop/getAllShops",
  async (thunkAPI) => {
    try {
      return await shopServices.getAllShops();
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

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShop.fulfilled, (state, action) => {
        state.shop = action.payload;
      })
      .addCase(getShop.fulfilled, (state, action) => {
        state.shop = action.payload;
      })
      .addCase(getAllShops.fulfilled, (state, action) => {
        state.shops = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = shopSlice.actions;

export default shopSlice.reducer;
