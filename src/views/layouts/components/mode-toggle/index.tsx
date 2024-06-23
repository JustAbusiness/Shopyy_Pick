import { IconButton } from '@mui/material'
import * as React from 'react'
import CustomIcon from 'src/components/Icon'
import { useSettings } from 'src/hooks/useSettings'
import { Mode } from 'src/types/layouts'

type TProps = {}

const ModeToggle = (props: TProps) => {
  const { settings, saveSettings } = useSettings()

  const handleModeChange = (mode: Mode) => {
    saveSettings({ ...settings, mode })
  }

  const handleToggleMode = () => {
    if (settings.mode === 'dark') {
      handleModeChange('light')
    } else {
      handleModeChange('dark')
    }
  }
  
return (
    <>
      <IconButton color='inherit' onClick={handleToggleMode} sx={{ marginLeft: '10px' }}>
        <CustomIcon icon={settings.mode === 'light' ? 'material-symbols:dark-mode-outline' : 'iconamoon:mode-light'} />
      </IconButton>
    </>
  )
}

export default ModeToggle
