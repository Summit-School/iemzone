import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import emailServices from "../services/emailSubscription";

const initialState = {
  emails: [],
};

export const subscribe = createAsyncThunk(
  "subscription/createProduct",
  async (data, thunkAPI) => {
    try {
      return await emailServices.subscribe(data);
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

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
export const { reset } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
