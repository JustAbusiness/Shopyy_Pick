import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { NextPage } from 'next'
import VerticalLayout from './VerticalLayout'
import HorizontalLayout from './HorizontalLayout'
import { useTheme } from '@mui/material/styles'

type TProps = {
  children: React.ReactNode
}

const LayoutNotApp: NextPage<TProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <VerticalLayout open={open} toggleDrawer={() => {}} isHidden={true} />
      {/* <HorizontalLayout open={false} toggleDrawer={() => {}} /> */}
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container
          sx={{
            m: 4,
            width: 'calc(100vw - 32px)',
            maxWidth: 'unset !important',
            overflow: 'hidden',
            padding: '5 !important',
            maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 32px)`
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default LayoutNotApp
