import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authenticationServices from "../services/authentication";

// Get user from localStorage
const user =
  typeof window !== "undefined"
    ? window.localStorage.getItem("temzone-user")
    : false;

// user state
const initialState = {
  user: user ? user : null,
  userData: {},
  wishlist: [],
};

// register user function
export const register = createAsyncThunk(
  "authentication/register",
  async (data, thunkAPI) => {
    try {
      return await authenticationServices.register(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        p;
      error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "authentication/login",
  async (data, thunkAPI) => {
    try {
      return await authenticationServices.login(data);
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

export const fetchUserData = createAsyncThunk(
  "authentication/read",
  async (userId, thunkAPI) => {
    try {
      return await authenticationServices.fetchUserData(userId);
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

export const updateUser = createAsyncThunk(
  "authentication/update",
  async (data, thunkAPI) => {
    try {
      return await authenticationServices.updateUser(data);
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

export const forgotPassword = createAsyncThunk(
  "authentication/forgotPassword",
  async (data, thunkAPI) => {
    try {
      return await authenticationServices.forgotPassword(data);
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

export const newPassword = createAsyncThunk(
  "authentication/newPassword",
  async (data, thunkAPI) => {
    try {
      return await authenticationServices.newPassword(data);
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

export const addToWishlist = createAsyncThunk(
  "authentication/addToWishlist",
  async (data, thunkAPI) => {
    try {
      return await authenticationServices.addToWishlist(data);
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

export const removeFromWishlist = createAsyncThunk(
  "authentication/removeFromWishlist",
  async (data, thunkAPI) => {
    try {
      return await authenticationServices.removeFromWishlist(data);
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

export const getWishlist = createAsyncThunk(
  "authentication/getWishlist",
  async (userID, thunkAPI) => {
    try {
      return await authenticationServices.getWishlist(userID);
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

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authenticationSlice.actions;

export default authenticationSlice.reducer;
