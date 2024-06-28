import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import PasswordIcon from '@mui/icons-material/Password'
import Logout from '@mui/icons-material/Logout'
import FaceIcon from '@mui/icons-material/Face'
import Image from 'next/image'
import { useAuth } from 'src/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
import { Typography } from '@mui/material'
import { toFullName } from 'src/utils'

type TProps = {}

const UserDropdown = (props: TProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { user, logout } = useAuth()
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigateMyProfile = () => {
    router.push(`${ROUTE_CONFIG.MY_PROFILE}`)
    handleClose()
  }

  const handleNavigateChangePassword = () => {
    router.push(`${ROUTE_CONFIG.CHANGE_PASSWORD}`)
    handleClose()
  }

  const handleNavigatHomePage = () => {
    router.push('/')
    handleClose()
  }
  
return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t('Account')}>
          <IconButton
            onClick={handleClick}
            size='small'
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.avatar ? <Image src={user?.avatar || ' '} alt='avatar' width={32} height={32} /> : <FaceIcon />}
            </Avatar>
            <Box>
              <Typography>
                {toFullName(user?.firstName || '', user?.middleName || ' ', user?.lastName || ' ', i18n.language)}
              </Typography>
              <Typography variant='caption'>{user?.role?.name}</Typography>
            </Box>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          {user?.firstName} {user?.middleName} {user?.lastName} {user?.email}
        </MenuItem>
        <MenuItem onClick={handleNavigateMyProfile}>
          <Avatar /> {t('Profile')}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleNavigatHomePage}>
          <ListItemIcon>
            <PersonAdd fontSize='small' />
          </ListItemIcon>
          {t('Add another account')}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          {t('Settings')}
        </MenuItem>
        <MenuItem onClick={handleNavigateChangePassword}>
          <ListItemIcon>
            <PasswordIcon fontSize='small' />
          </ListItemIcon>
          {t('Change_password')}
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          {t('Logout')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default UserDropdown
