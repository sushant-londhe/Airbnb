import { createSlice } from '@reduxjs/toolkit'

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      // action.payload will give you an access to the parameter
      // passed while sending the action to the dispatch()
      //   let found = false
      //   for (const item of state.items) {
      //     if (item['id'] == action.payload.id) {
      //       found = true
      //       break
      //     }
      //   }
      //   if (!found) {
      //     state.items.push(action.payload)
      //   }

      // find the index of an item based on its id
      const index = state.items.findIndex(
        (item) => item['id'] == action.payload.id
      )

      // index == -1: the property does not exist in wishlist collection
      if (index == -1) {
        state.items.push(action.payload)
      }
    },
    removeFromWishlist: (state, action) => {
      // find the index of an item based on its id
      const index = state.items.findIndex(
        (item) => item['id'] == action.payload.id
      )

      // remove the item using index
      state.items.splice(index, 1)
    },
  },
})

// export all actions
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions

// export default reducer
export default wishlistSlice.reducer
