'use client'
import { NextPage } from 'next'
import * as React from 'react'
import Button from '@mui/material/Button'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CustomTextFields from 'src/components/text-field'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
import { Avatar, Card, IconButton, InputAdornment, useTheme } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'
import Image from 'next/image'
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'
import { useAuth } from 'src/hooks/useAuth'

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

const MyProfilePage: NextPage<TProps> = () => {
  const { user } = useAuth()
  const theme = useTheme()
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
    console.log('data', data, errors)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
        <Card sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', p: 5 }}>
          <Grid container spacing={5}>
            <Grid container item md={6} xs={12} spacing={2}>
              <Grid item md={12} xs={12}>
                <p style={{ fontSize: '14px', marginBottom: '5px' }}>Avatar</p>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'cneter',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Avatar sx={{ width: 200, height: 200 }}>
                    {user?.avatar ? (
                      <Image src={user?.avatar || ' '} alt='avatar' width={200} height={200} />
                    ) : (
                      <FaceIcon sx={{ width: 200, height: 200 }} />
                    )}
                  </Avatar>
                  <Button variant='outlined' sx={{ width: '15%', m: 5, ml: 12 }}>
                    Upload <FileUploadIcon sx={{ marginLeft: '3px'}}/>
                  </Button>
                </Box>
              </Grid>
              <Grid item md={6} xs={12}>
                <p style={{ fontSize: '14px', marginBottom: '5px' }}>Email</p>
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
              </Grid>
              <Grid item md={6} xs={12}>
                <p style={{ fontSize: '14px', marginBottom: '5px' }}>Email</p>
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
              </Grid>
            </Grid>
            <Grid container item md={6} xs={12} spacing={2}>
              <Grid item md={6} xs={12}>
                <p style={{ fontSize: '14px', marginBottom: '5px' }}>Email</p>
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
              </Grid>
              <Grid item md={6} xs={12}>
                <p style={{ fontSize: '14px', marginBottom: '5px' }}>Email</p>
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
              </Grid>
            </Grid>
          </Grid>

          <Button type='submit' variant='contained' sx={{ mt: 5, mb: 2 }}>
            Update
          </Button>
        </Card>
      </form>
    </>
  )
}

export default MyProfilePage
