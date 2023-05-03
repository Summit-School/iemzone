import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productServices from '../../services/admin/product'

const initialState = {
  products: null,
  product: null
}

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (data, thunkAPI) => {
    try {
      return await productServices.createProduct(data)
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

export const shopProducts = createAsyncThunk(
  'products/shopProduct',
  async (shopId, thunkAPI) => {
    try {
      return await productServices.shopProducts(shopId)
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

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: state => {}
  },
  extraReducers: builder => {
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        state.product = action.payload
      })
       .addCase(shopProducts.fulfilled, (state, action) => {
        state.products = action.payload
      })
  }
})

// Action creators are generated for each case reducer function
export const { reset } = productSlice.actions

export default productSlice.reducer