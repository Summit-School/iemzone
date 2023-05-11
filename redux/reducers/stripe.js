import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import stripeServices from "../services/stripe";

const initialState = {
  response: null,
};

export const stripePayment = createAsyncThunk(
  "stripe/stripePayment",
  async (data, thunkAPI) => {
    try {
      return await stripeServices.stripePayment(data);
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

export const stripeSlice = createSlice({
  name: "stripePayment",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(stripePayment.fulfilled, (state, action) => {
      state.response = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = stripeSlice.actions;

export default stripeSlice.reducer;
