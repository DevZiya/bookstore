import { createSlice } from '@reduxjs/toolkit'



export const searchSlice = createSlice({
  name: 'search',
  initialState:{
    search:'',
  },
  reducers: {
    searchBook: (state,action) => {
     state.search=action.payload
    }
  },
})

export const { searchBook } = searchSlice.actions

export default searchSlice.reducer