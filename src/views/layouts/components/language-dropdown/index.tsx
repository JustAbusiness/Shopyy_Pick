import * as React from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import { Box, BoxProps, Button, IconButton, Popover, Typography, styled } from '@mui/material'
import CustomIcon from 'src/components/Icon'
import { LANGUAGE_OPTIONS } from 'src/configs/i18n'

type TProps = {}

interface TStyledItem extends BoxProps {
  selected: boolean
}

const StyledItemLanguage = styled(Box)<TStyledItem>(({ theme, selected }) => {
  console.log('selected', { selected })

  return {
    cursor: 'pointer',
    '.MuiTypography-root': {
      padding: '8px 12px'
    }
  }
})

const LanguageDropdown = (props: TProps) => {
  // ** State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  // ** Hooks
  const { i18n } = useTranslation()
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOnChangeLang = (lang: string) => {
    i18n.changeLanguage(lang)
    handleClose()
  }
  console.log('language now is ', i18n.language)

  return (
    <>
      <IconButton sx={{ marginLeft: '10px' }} id='language-dropdown' onClick={handleClick}>
        <CustomIcon icon='material-symbols-light:translate' />
      </IconButton>
      <Popover
        id={'language-dropdown'}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        {LANGUAGE_OPTIONS.map(lang => (
          <StyledItemLanguage
            selected={lang.value === i18n.language}
            key={lang.value}
            onClick={() => handleOnChangeLang(lang.value)}
          >
            <Typography sx={{ p: 2 }}>{lang.lang}</Typography>
          </StyledItemLanguage>
        ))}
      </Popover>
    </>
  )
}

export default LanguageDropdown
