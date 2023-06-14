import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import campayServices from "../services/campay";

const initialState = {
  response: null,
};

export const campayPayment = createAsyncThunk(
  "campay/campayPayment",
  async (data, thunkAPI) => {
    try {
      return await campayServices.campayPayment(data);
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

export const campaySlice = createSlice({
  name: "campayPayment",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(campayPayment.fulfilled, (state, action) => {
      state.response = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = campaySlice.actions;

export default campaySlice.reducer;
