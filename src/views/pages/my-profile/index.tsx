'use client'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CustomTextFields from 'src/components/text-field'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EMAIL_REG } from 'src/configs/regex'
import { Avatar, IconButton, useTheme } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import { getAuthMe } from 'src/services/auth'
import { UserDataType } from 'src/contexts/types'
import { convertToBase64, toFullName } from 'src/utils'
import { useTranslation } from 'react-i18next'
import CustomIcon from 'src/components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { updateAuthMeAync } from 'src/stores/apps/auth/actions'
import { AppDispatch, RootState } from 'src/stores'
import toast from 'react-hot-toast'
import { resetInitialState } from 'src/stores/apps/auth'
import FallbackSpinner from 'src/components/fall-back'

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
  // ** State
  const [loading, setLoading] = useState(true)
  const [avatar, setAvatar] = useState('')
  const [user, setUser] = useState<UserDataType | null>(null)
  const [roleId, setRoleId] = useState('')

  // ** Translate
  const { i18n } = useTranslation()

  // ** Theme
  const theme = useTheme()

  // ** Dispatch Redux
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe } = useSelector(
    (state: RootState) => state.auth
  )

  // ** React hook form
  const schema = yup.object().shape({
    email: yup.string().required('Email is required').matches(EMAIL_REG, 'Email is not valid'),
    role: yup.string().required('Role is required'),
    addresses: yup.string().required('Address is required'),
    phoneNumber: yup.string().min(8, 'Phone number is min 8 number'),
    city: yup.string(),
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

  // Fetch auth me
  const fecthAuthMe = async () => {
    await getAuthMe()
      .then(async response => {
        setLoading(false)
        const data = response?.data
        if (data) {
          setRoleId(data?.role?._id),
            setAvatar(data?.avatar),
            reset({
              email: data?.email || '',
              addresses: data?.addresses || '',
              phoneNumber: data?.phoneNumber || '',
              city: data?.city || '',
              fullName: toFullName(data?.firstName, data?.middleName, data?.lastName, i18n.language),
              role: data?.role?.name
            })
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fecthAuthMe()
  }, [])

  useEffect(() => {
    if (messageUpdateMe) {
      if (isErrorUpdateMe) {
        toast.error(messageUpdateMe)
      } else if (isSuccessUpdateMe) {
        toast.success(messageUpdateMe)
        fecthAuthMe() // Fetch data about me after update success
      }
      dispatch(resetInitialState())
    }
  }, [isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe])

  const onSubmit = (data: any) => {
    dispatch(
      updateAuthMeAync({
        email: data.email,
        firstName: data.fullName,
        addresses: data.addresses,
        avatar,
        role: roleId,
        phoneNumber: data.phoneNumber
      })
    )
  }

  const handleUploadAvatar = async (file: File) => {
    const base64 = await convertToBase64(file)
    setAvatar(base64 as string)
  }

  return (
    <>
      {loading || (isLoading && <FallbackSpinner />)}
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
                      justifyContent: 'center',
                      gap: 2
                    }}
                  >
                    <Box sx={{ position: 'relative' }}>
                      {avatar && (
                        <IconButton
                          sx={{ position: 'absolute', right: '72%', top: 0, zIndex: 2 }}
                          edge='start'
                          color='inherit'
                          onClick={() => setAvatar('')}
                        >
                          <CustomIcon
                            icon='material-symbols-light:close'
                            style={{ background: 'red', borderRadius: '10px' }}
                          />
                        </IconButton>
                      )}
                      {avatar ? (
                        <Avatar src={avatar} sx={{ width: 200, height: 200 }}>
                          <CustomIcon icon='ph:user-thin' fontSize={70} />
                        </Avatar>
                      ) : (
                        <Avatar sx={{ width: 200, height: 200 }}>
                          <FaceIcon sx={{ width: 200, height: 200 }} />
                        </Avatar>
                      )}
                    </Box>
                    <WrapperFileUpload
                      uploadFunc={handleUploadAvatar}
                      objectAcceptFile={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                    >
                      <Button variant='outlined' sx={{ width: '15%', m: 5, ml: '8%', cursor: 'pointer' }}>
                        {avatar ? 'Change' : 'Upload'}
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
                        autoFocus
                        disabled
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
                        onChange={e => {
                          const numValue = e.target.value.replace(/\D/g, '')
                          onChange(numValue)
                        }}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*',
                          minLength: 8
                        }}
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
