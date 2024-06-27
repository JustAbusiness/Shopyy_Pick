import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomTextFields from 'src/components/text-field'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PASSWORD_REG } from 'src/configs/regex'
import { IconButton, InputAdornment, useTheme } from '@mui/material'
import CustomIcon from 'src/components/Icon'
import Image from 'next/image'
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/components/fall-back'
import { resetInitialState } from 'src/stores/apps/auth'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
import { changePasswordMeAync } from 'src/stores/apps/auth/actions'
import { useAuth } from 'src/hooks/useAuth'

type TProps = {}
type TDefualtValues = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

const ChangePasswordPage: NextPage<TProps> = () => {
  const [showCurrentPassword, setShowCurrentPassoword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // ** AUTH
  const { logout } = useAuth()

  // ** REDUX
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isErrorChangePassword, isSuccessChangePassword, messageChangePassword } = useSelector(
    (state: RootState) => state.auth
  )

  // ** HOOKS
  const theme = useTheme()
  const router = useRouter()
  const schema = yup.object().shape({
    currentPassword: yup.string().required('The field is required').matches(PASSWORD_REG, 'Email is not valid'),
    newPassword: yup
      .string()
      .required('The field is required')
      .matches(PASSWORD_REG, 'The password is contain character, number and special character'),
    confirmNewPassword: yup
      .string()
      .required('The field is required')
      .matches(PASSWORD_REG, 'The password is contain character, number and special character')
      .oneOf([yup.ref('newPassword'), 'Passwords must match'])
  })

  const defaultValues: TDefualtValues = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { currentPassword: string; newPassword: string }) => {
    if (!Object.keys(errors).length) {
      dispatch(changePasswordMeAync({ currentPassword: data.currentPassword, newPassword: data.newPassword }))
    }
  }

  useEffect(() => {
    if (messageChangePassword) {
      if (isErrorChangePassword) {
        toast.error(messageChangePassword)
      } else if (isSuccessChangePassword) {
        toast.success(messageChangePassword)
        setTimeout(() => {
          logout()
        }, 500)
      }
    }
    dispatch(resetInitialState()) // Reset state after show toast
  }, [isErrorChangePassword, isSuccessChangePassword, messageChangePassword])

  return (
    <>
      {isLoading && <FallbackSpinner />}
      <Box
        sx={{
          //   height: '100vh',
          //   width: '100vw',
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          padding: '40px'
        }}
      >
        <Box
          display={{ md: 'flex', xs: 'none' }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.customColors.bodyBg,
            borderRadius: '20px',
            height: '100%',
            minWidth: '50vw'
          }}
        >
          <Image
            src={theme.palette.mode === 'light' ? RegisterLight : RegisterDark}
            alt='login image'
            style={{ height: 'auto', width: 'auto' }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component='h1' variant='h1' sx={{ marginBottom: 6 }}>
              Đăng Ký
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
              <Box width={{ md: '300px' }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextFields
                      required
                      fullWidth
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors?.currentPassword)}
                      placeholder='Nhập mật khẩu hiện tại'
                      helperText={errors?.currentPassword?.message}
                    />
                  )}
                  name='currentPassword'
                />
              </Box>
              <Box sx={{ marginTop: 5 }} width={{ md: '300px' }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextFields
                      required
                      fullWidth
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder='Nhập mật khẩu mới'
                      error={Boolean(errors?.newPassword)}
                      helperText={errors?.newPassword?.message}
                      type={showNewPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowNewPassword(!showNewPassword)}>
                              {showNewPassword ? (
                                <CustomIcon icon='material-symbols:visibility-outline' />
                              ) : (
                                <CustomIcon icon='ic:outline=visibility-off' />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='newPassword'
                />
              </Box>
              <Box sx={{ marginTop: 5 }} width={{ md: '300px' }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextFields
                      required
                      fullWidth
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder='Nhập lại mật khẩu mới'
                      error={Boolean(errors?.confirmNewPassword)}
                      helperText={errors?.confirmNewPassword?.message}
                      type={showConfirmPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                              {showConfirmPassword ? (
                                <CustomIcon icon='material-symbols:visibility-outline' />
                              ) : (
                                <CustomIcon icon='ic:outline=visibility-off' />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='confirmNewPassword'
                />
              </Box>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 5, mb: 2 }}>
                Change
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ChangePasswordPage
