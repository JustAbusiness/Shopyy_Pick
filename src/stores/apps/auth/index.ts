// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { registerAuthAync } from './actions'

interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

const initialState = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
  typeError: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message  = ""
      state.typeError = ""
    }
  },
  extraReducers: builder => {
    builder.addCase(registerAuthAync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(registerAuthAync.fulfilled, (state, action) => {
      console.log('action', { action })
      state.isLoading = false
      state.isSuccess = !!action.payload?.data?.email
      state.isError = !action.payload?.data?.email
      state.message  = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    builder.addCase(registerAuthAync.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message  = ""
      state.typeError = ""
    })
  }
})

export const { resetInitialState } = authSlice.actions
export default authSlice.reducer
