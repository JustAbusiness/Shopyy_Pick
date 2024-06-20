import * as React from 'react'
import { NextPage } from 'next'
import { Box, styled, BoxProps } from '@mui/material'

type TProps = {
  children: React.ReactNode
}

const BlankLayoutWarpper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh'
}))

const BlankLayout: NextPage<TProps> = ({ children }) => {
  return (
    <BlankLayoutWarpper>
      <Box sx={{ overflow: 'hidden', minHeight: '100vh' }}>{children}</Box>
    </BlankLayoutWarpper>
  )
}

export default BlankLayout
