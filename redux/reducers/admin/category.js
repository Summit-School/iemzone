import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import categoryServices from '../../services/admin/category'

const initialState = {
  categories: null
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

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    reset: state => {}
  },
  extraReducers: builder => {
    builder
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  }
})

// Action creators are generated for each case reducer function
export const { reset } = categorySlice.actions

export default categorySlice.reducer