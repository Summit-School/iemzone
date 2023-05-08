import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productReview from "../../services/admin/productReview";

const initialState = {
  reviews: [],
  review: null,
};

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (data, thunkAPI) => {
    try {
      return await productReview.createReview(data);
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

export const getProductReviews = createAsyncThunk(
  "reviews/getProductReviews",
  async (prodId, thunkAPI) => {
    try {
      return await productReview.getProductReviews(prodId);
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

export const productReviewSlice = createSlice({
  name: "prductReviews",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.fulfilled, (state, action) => {
        state.review = action.payload;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = productReviewSlice.actions;

export default productReviewSlice.reducer;
