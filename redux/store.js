import { configureStore } from '@reduxjs/toolkit'
import authentication from './reducers/authentication'

export const store = configureStore({
  reducer: {
    authentication
  }
})
