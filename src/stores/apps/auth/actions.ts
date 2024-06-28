import { createAsyncThunk } from '@reduxjs/toolkit'
import { changePasswordMe, registerAuth, updateAuthMe } from 'src/services/auth'
import { TChangePassword } from 'src/types/auth'

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
    console.log('response update', response)
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

// ** Change Password
export const changePasswordMeAync = createAsyncThunk(
  'auth/change-password-me', // => Actions type in redux
  async (data: TChangePassword) => {
    const response = await changePasswordMe(data)

    if (response?.status === "Success") {
      return {...response, data: 1}
    }

    return {
      data: null,
      message: response?.response?.data?.message,
      typeError: response?.response?.data?.typeError
    }
  }
)
