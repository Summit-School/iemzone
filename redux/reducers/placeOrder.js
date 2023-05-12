import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderServices from "../services/placeOrder";

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

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = orderSlice.actions;

export default orderSlice.reducer;
