import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import shopServices from '../services/shop'

const initialState = {
  shop: null
}

export const createShop = createAsyncThunk(
  'shop/createShop',
  async (data, thunkAPI) => {
    try {
      return await shopServices.createShop(data)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    reset: state => {}
  },
  extraReducers: builder => {
    builder
      .addCase(createShop.fulfilled, (state, action) => {
        state.shop = action.payload
      })
  }
})

// Action creators are generated for each case reducer function
export const { reset } = shopSlice.actions

export default shopSlice.reducer