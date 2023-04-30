import { configureStore } from '@reduxjs/toolkit'
import authentication from './reducers/authentication'
import shop from './reducers/shop'
import categories from './reducers/admin/category'

export const store = configureStore({
  reducer: {
    authentication,
    shop,
    categories
  }
})
