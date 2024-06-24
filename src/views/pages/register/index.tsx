'use client'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomTextFields from 'src/components/text-field'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { IconButton, InputAdornment, useTheme } from '@mui/material'
import CustomIcon from 'src/components/Icon'
import Image from 'next/image'
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'
import { useDispatch, useSelector } from 'react-redux'
import { registerAuthAync } from 'src/stores/apps/auth/actions'
import { AppDispatch, RootState } from 'src/stores'
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/components/fall-back'
import { resetInitialState } from 'src/stores/apps/auth'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'

function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Shoppy_Pick | Robert Pham
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

type TProps = {}

const RegisterPage: NextPage<TProps> = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false)

  // ** REDUX
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isError, isSuccess, message, typeError } = useSelector((state: RootState) => state.auth)

  // ** HOOKS
  const theme = useTheme()
  const router = useRouter()
  const schema = yup.object().shape({
    email: yup.string().required('Email is required').matches(EMAIL_REG, 'Email is not valid'),
    password: yup
      .string()
      .required('Password is required')
      .matches(PASSWORD_REG, 'The password is contain character, number and special character'),
    confirmPassword: yup
      .string()
      .required('Password is required')
      .matches(PASSWORD_REG, 'The password is contain character, number and special character')
      .oneOf([yup.ref('password'), 'Passwords must match'])
  })
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string; confirmPassword: string }) => {
    dispatch(registerAuthAync({ email: data.email, password: data.password }))
  }

  useEffect(() => {
    if (message) {
      if (isError) {
        toast.error(message)
      } else if (isSuccess) {
        toast.success(message)
        router.push(ROUTE_CONFIG.LOGIN)
      }
    }
    dispatch(resetInitialState());       // Reset state after show toast
  }, [isError, isSuccess, message])

  return (
    <>
      {isLoading && <FallbackSpinner />}
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
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
                      error={Boolean(errors?.email)}
                      placeholder='Nhập email'
                      helperText={errors?.email?.message}
                    />
                  )}
                  name='email'
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
                      placeholder='Nhập mật khẩu'
                      error={Boolean(errors?.password)}
                      helperText={errors?.password?.message}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? (
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
                  name='password'
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
                      placeholder='Nhập lại mật khẩu'
                      error={Boolean(errors?.confirmPassword)}
                      helperText={errors?.confirmPassword?.message}
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
                  name='confirmPassword'
                />
              </Box>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 5, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Typography sx={{ marginRight: 5 }}>{' Already have an account?'}</Typography>
                </Grid>
                <Grid item>
                  <Link href='/login'>{'Sign In'}</Link>
                </Grid>
              </Grid>
            </form>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default RegisterPage
