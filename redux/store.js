import { configureStore } from '@reduxjs/toolkit'
import authentication from './reducers/authentication'
import shop from './reducers/shop'

export const store = configureStore({
  reducer: {
    authentication,
    shop
  }
})
