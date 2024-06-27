import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerAuth, updateAuthMe } from 'src/services/auth'

// ** Register Auth
export const registerAuthAync = createAsyncThunk(
  'auth/register', // => Actions type in redux
  async (data: any) => {
    const response = await registerAuth(data)

    if (response?.data) {
      return response
    }
    
return {
      data: null,
      message: response?.response?.data?.message,
      typeError: response?.response?.data?.typeError
    }
  }
)


// ** Update Auth Me
export const updateAuthMeAync = createAsyncThunk(
  'auth/update-me', // => Actions type in redux
  async (data: any) => {
    const response = await updateAuthMe(data)
    console.log("response update", response)
    if (response?.data) {
      return response
    }
    
return {
      data: null,
      message: response?.response?.data?.message,
      typeError: response?.response?.data?.typeError
    }
  }
)
