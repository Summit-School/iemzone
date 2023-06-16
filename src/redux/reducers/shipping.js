import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shippingServices from "../services/shipping";

const initialState = {
  shippingFee: null,
};

export const getShippingFee = createAsyncThunk(
  "shipping/getShippingFee",
  async (data, thunkAPI) => {
    try {
      return await shippingServices.getShippingFee(data);
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

export const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getShippingFee.fulfilled, (state, action) => {
      state.shippingFee = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = shippingSlice.actions;

export default shippingSlice.reducer;
