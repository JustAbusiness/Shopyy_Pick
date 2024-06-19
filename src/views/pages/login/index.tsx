'use client'
import { NextPage } from 'next'
import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
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
import LoginDark from '/public/images/login-dark.png'
import LoginLight from '/public/images/login-light.png'
import GoogleSvg from '/public/svgs/google.svg'
import FacebookSvg from '/public/svgs/facebook.svg'

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

const LoginPage: NextPage<TProps> = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [isRemember, setIsRemember] = React.useState<boolean>(false)
  const theme = useTheme()
  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is required').matches(EMAIL_REG, 'Email is not valid'),
      password: yup
        .string()
        .required('Password is required')
        .matches(PASSWORD_REG, 'The password is contain character, number and special character')
    })
    .required()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  console.log('errors', errors)
  const onSubmit = (data: { email: string; password: string }) => {
    console.log('data', data, errors)
  }
  
return (
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
        <Image src={LoginDark} alt='login image' style={{ height: 'auto', width: 'auto' }} />
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
          <Typography component='h1' variant='h5' sx={{ marginBottom: 6 }}>
            Đăng Nhập
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box>
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
            <Box sx={{ marginTop: 5 }}>
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
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    name='rememberMe'
                    checked={isRemember}
                    onChange={e => setIsRemember(e.target.checked)}
                  />
                }
                label='Remember me'
              />
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Box>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  {"Don't have an account?"}
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {'Sign Up'}
                </Link>
              </Grid>
            </Grid>
            <Typography sx={{ textAlign: 'center', mt: 2, md: 2 }}>Or</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <IconButton sx={{ color: theme.palette.error.main }}>
                <Image src={GoogleSvg} style={{ height: '40px', width: '40px' }} alt='google' />
              </IconButton>
              <IconButton sx={{ color: theme.palette.error.main }}>
                <Image src={FacebookSvg} style={{ height: '40px', width: '40px' }} alt='facebook' />
              </IconButton>
            </Box>
          </form>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
