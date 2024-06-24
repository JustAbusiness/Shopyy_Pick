'use client'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CustomTextFields from 'src/components/text-field'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG } from 'src/configs/regex'
import { Avatar, useTheme } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'
import Image from 'next/image'
import { useAuth } from 'src/hooks/useAuth'
import WrapperFileUpload from 'src/components/wrapper-file-upload'

type TProps = {}

type TDefualtValues = {
  email: string
  role: string
  addresses: string
  phoneNumber: string
  city: string
  fullName: string
}
const MyProfilePage: NextPage<TProps> = () => {
  const { user } = useAuth()
  const theme = useTheme()
  const schema = yup.object().shape({
    email: yup.string().required('Email is required').matches(EMAIL_REG, 'Email is not valid'),
    role: yup.string().required('Role is required'),
    addresses: yup.string().required('Address is required'),
    phoneNumber: yup.string().required('Phone Number is required'),
    city: yup.string().required('City is required'),
    fullName: yup.string().required('Full Name is required')
  })

  const defaultValues: TDefualtValues = {
    email: '',
    role: '',
    addresses: '',
    phoneNumber: '',
    city: '',
    fullName: ''
  }
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    console.log('data', data, errors)
  }

  const handleUploadAvatar = (file: File) => {
    console.log('file', file)
  }

  useEffect(() => {
    if (user) {
      reset({
        email: user?.email || '',
        addresses: user?.addresses || '',
        phoneNumber: user?.phoneNumber || '',
        city: user?.city || '',
        fullName: user?.fullName || '',
        role: user?.role?.name
      })
    }
  }, [])
  
return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
        <Grid container>
          <Grid
            container
            item
            md={6}
            xs={12}
            spacing={4}
            sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: '20px', px: 4 }}
          >
            <Box sx={{ height: '100%', width: '100%' }}>
              <Grid container spacing={4}>
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
                    <WrapperFileUpload
                      uploadFunc={handleUploadAvatar}
                      objectAcceptFile={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                    >
                      <Button variant='outlined' sx={{ width: '15%', m: 5, ml: '8%', cursor: 'pointer' }}>
                        Upload
                      </Button>
                    </WrapperFileUpload>
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
                  <p style={{ fontSize: '14px', marginBottom: '5px' }}>Vai Trò</p>
                  <Controller
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextFields
                        required
                        fullWidth
                        disabled
                        autoFocus
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        error={Boolean(errors?.role)}
                        placeholder='Chọn vai trò'
                        helperText={errors?.role?.message}
                      />
                    )}
                    name='role'
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid container item md={6} xs={12} mt={{ md: 0, xs: 10 }}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.background.paper,
                borderRadius: '15px',
                py: 5,
                px: 4
              }}
              marginLeft={{ md: 5, xs: 0 }}
            >
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <p style={{ fontSize: '14px', marginBottom: '5px' }}>Full Name</p>
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
                        error={Boolean(errors?.fullName)}
                        placeholder='Nhập họ và tên'
                        helperText={errors?.fullName?.message}
                      />
                    )}
                    name='fullName'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <p style={{ fontSize: '14px', marginBottom: '5px' }}>Address</p>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextFields
                        required
                        fullWidth
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        error={Boolean(errors?.addresses)}
                        placeholder='Nhập địa chỉ'
                        helperText={errors?.addresses?.message}
                      />
                    )}
                    name='addresses'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <p style={{ fontSize: '14px', marginBottom: '5px' }}>City</p>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextFields
                        required
                        fullWidth
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        error={Boolean(errors?.city)}
                        placeholder='Nhập email'
                        helperText={errors?.city?.message}
                      />
                    )}
                    name='city'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <p style={{ fontSize: '14px', marginBottom: '5px' }}>Phone Number</p>
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
                        error={Boolean(errors?.phoneNumber)}
                        placeholder='Nhập số điện thoại'
                        helperText={errors?.phoneNumber?.message}
                      />
                    )}
                    name='phoneNumber'
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Button type='submit' variant='contained' sx={{ mt: 5, mb: 2 }}>
          Update
        </Button>
      </form>
    </>
  )
}

export default MyProfilePage
