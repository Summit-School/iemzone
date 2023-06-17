import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderServices from "../services/order";

const initialState = {
  orders: [],
  order: null,
};

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (data, thunkAPI) => {
    try {
      return await orderServices.placeOrder(data);
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

export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (userId, thunkAPI) => {
    try {
      return await orderServices.getUserOrders(userId);
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

// export const getShopOrders = createAsyncThunk(
//   "orders/getShopOrders",
//   async (shopId, thunkAPI) => {
//     try {
//       return await orderServices.getShopOrders(shopId);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const getSingleOrder = createAsyncThunk(
  "orders/getSingleOrder",
  async (prodId, thunkAPI) => {
    try {
      return await orderServices.getSingleOrder(prodId);
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

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async (data, thunkAPI) => {
    try {
      return await orderServices.updateOrderStatus(data);
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

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = orderSlice.actions;

export default orderSlice.reducer;
