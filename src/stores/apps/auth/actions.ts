import { createAsyncThunk } from '@reduxjs/toolkit'
import { registerAuth } from 'src/services/auth'

// ** Register Auth
export const registerAuthAync = createAsyncThunk(
  'auth/register', // => Actions type in redux
  async (data: any) => {
    const response = await registerAuth(data)
    console.log("response", response)
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
