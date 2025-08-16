import { configureStore } from '@reduxjs/toolkit'
import wishlistSlice from './features/wishlist.slice'

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
  },
})
