import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supportTicketServices from "../services/supportTicket";

const initialState = {
  ticket: null,
  tickets: [],
};

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (data, thunkAPI) => {
    try {
      return await supportTicketServices.createTicket(data);
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

export const getAllTickets = createAsyncThunk(
  "ticket/getAllTickets",
  async (thunkAPI) => {
    try {
      return await supportTicketServices.getAllTickets();
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

export const getSingleTicket = createAsyncThunk(
  "ticket/getSingleTicket",
  async (data, thunkAPI) => {
    try {
      return await supportTicketServices.getSingleTicket(data);
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

export const sendTicketMsg = createAsyncThunk(
  "ticket/sendTicketMsg",
  async (data, thunkAPI) => {
    try {
      return await supportTicketServices.sendTicketMsg(data);
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

export const updateTicketStatus = createAsyncThunk(
  "ticket/updateTicketStatus",
  async (data, thunkAPI) => {
    try {
      return await supportTicketServices.updateTicketStatus(data);
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

export const supportTicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.ticket = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = supportTicketSlice.actions;

export default supportTicketSlice.reducer;
