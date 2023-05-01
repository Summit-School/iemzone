import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import categoryServices from '../../services/admin/category'

const initialState = {
  categories: null,
  category: null
}

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (data, thunkAPI) => {
    try {
      return await categoryServices.createCategory(data)
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

export const userCategories = createAsyncThunk(
  'categories/userCategories',
  async (userId, thunkAPI) => {
    try {
      return await categoryServices.userCategories(userId)
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

export const singleCategory = createAsyncThunk(
  'categories/singleCategory',
  async (slug, thunkAPI) => {
    try {
      return await categoryServices.singleCategory(slug)
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

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (data, thunkAPI) => {
    try {
      return await categoryServices.updateCategory(data)
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
  'categories/deleteCategory',
  async (catId, thunkAPI) => {
    try {
      return await categoryServices.deleteCategory(catId)
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

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    reset: state => {}
  },
  extraReducers: builder => {
    builder
      .addCase(userCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })

       .addCase(singleCategory.fulfilled, (state, action) => {
        state.category = action.payload
      })
  }
})

// Action creators are generated for each case reducer function
export const { reset } = categorySlice.actions

export default categorySlice.reducer