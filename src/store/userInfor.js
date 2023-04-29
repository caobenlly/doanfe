import { createSlice } from '@reduxjs/toolkit'

export const userInfor = createSlice({
  name: 'userInfor',
  initialState: {
    information: {},
  },
  reducers: {
    setInformation: (state, action) => {
      state.information = action.payload
    },
    },
})
export const { setInformation } = userInfor.actions
export default userInfor.reducer
