import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import brandServices from '../../services/admin/brand'

const initialState = {
  brands: null,
  brand: null
}

export const createBrand = createAsyncThunk(
  'brands/createBrand',
  async (data, thunkAPI) => {
    try {
      return await brandServices.createBrand(data)
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

export const userBrands = createAsyncThunk(
  'brands/userBrands',
  async (userId, thunkAPI) => {
    try {
      return await brandServices.userBrands(userId)
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

export const singleBrand = createAsyncThunk(
  'brands/singleBrand',
  async (slug, thunkAPI) => {
    try {
      return await brandServices.singleBrand(slug)
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

export const updateBrand = createAsyncThunk(
  'brands/updateBrand',
  async (data, thunkAPI) => {
    try {
      return await brandServices.updateBrand(data)
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

export const deleteCategory = createAsyncThunk(
  'brands/deleteBrand',
  async (brandId, thunkAPI) => {
    try {
      return await brandServices.deleteCategory(brandId)
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

export const changeFeaturedBrand = createAsyncThunk(
  'brands/changeFeaturedBrand',
  async (brandId, thunkAPI) => {
    try {
      return await brandServices.changeFeaturedBrand(brandId)
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

export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    reset: state => {}
  },
  extraReducers: builder => {
    builder
      .addCase(userBrands.fulfilled, (state, action) => {
        state.brands = action.payload
      })

       .addCase(singleBrand.fulfilled, (state, action) => {
        state.brand = action.payload
      })
  }
})

// Action creators are generated for each case reducer function
export const { reset } = brandSlice.actions

export default brandSlice.reducer