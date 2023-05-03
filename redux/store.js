import { configureStore } from '@reduxjs/toolkit'
import authentication from './reducers/authentication'
import shop from './reducers/shop'
import categories from './reducers/admin/category'
import brands from './reducers/admin/brand'
import products from './reducers/admin/product'

export const store = configureStore({
  reducer: {
    authentication,
    shop,
    categories,
    brands,
    products
  }
})

   