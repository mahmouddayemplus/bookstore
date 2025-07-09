
import { createSlice } from '@reduxjs/toolkit';
  

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser:null
  },
  reducers: {
    setUser: (state, action) => {
      
        
        state.currentUser = action.payload
        
  
    },
 
  }
})

export const { setUser} = userSlice.actions;

export const selectUser = state => state.user.currentUser;

export default userSlice.reducer;