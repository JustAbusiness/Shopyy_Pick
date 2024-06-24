// ** React Imports

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Image from 'next/image'
import { ReactNode } from 'react'
import BlankLayout from 'src/views/layouts/BlankLayout'

const Error404 = () => {
  return (
    <Box className='content-center'>
      <Image
        style={{ display: 'flex', alignItems: 'center', marginLeft: '28%' }}
        src='/images/404.png'
        width={600}
        height={550}
        loading='lazy'
        alt='page not found'
      />
      <Typography variant='h2' sx={{ mb: 1.5, textAlign: 'center' }}>
        {' '}
        Page Not Found
      </Typography>
    </Box>
  )
}

export default Error404
Error404.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
