import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import { NextPage } from 'next'
import { IconButton } from '@mui/material'
import ListVerticalLayout from './ListVerticalLayout'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Image from 'next/image'
import Link from 'next/link'

const drawerWidth: number = 240

type TProps = {
  open: boolean
  toggleDrawer: () => void
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(12),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(10)
      }
    })
  }
}))

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer }) => {
  const [openStatus, setOpenStatus] = React.useState(true)

  const handleClick = () => {
    setOpenStatus(!openStatus)
  }

  return (
    <Drawer variant='permanent' open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <Link href={'/'}>
          <Image
            style={{ cursor: 'pointer', borderRadius: '50%', marginRight: '60px' }}
            src='/images/huy2.jpeg'
            alt='logo'
            width={50}
            height={50}
          />
        </Link>
        <IconButton onClick={toggleDrawer}>{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
      </Toolbar>
      <Divider />
      <ListVerticalLayout open={openStatus} />
    </Drawer>
  )
}

export default HorizontalLayout
