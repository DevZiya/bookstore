import { configureStore } from '@reduxjs/toolkit'
import cartRedux from './cartRedux'
import searchRedux from './searchRedux'

export const store = configureStore({
  reducer: {
    search:searchRedux,
    cart:cartRedux
  },
})