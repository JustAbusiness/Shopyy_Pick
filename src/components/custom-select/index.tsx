import * as React from 'react'
import { styled, Select, MenuItem, MenuItemProps, SelectProps, InputLabel, InputLabelProps, Box } from '@mui/material'

interface TCustomSelect {
  options: { label: string; value: string }[]
  value: string
  label: string
  onChange: SelectProps['onChange']
  fullWidth?: boolean
  error: boolean
}

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
    padding: '8px 8px 8px 10px',
    height: '40px',
    boxSizing: 'border-box'
  }
}))

const CustomPlaceholder = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  left: "10px",
  zIndex: 2
}))

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({}))

const CustomeSelect = (props: TCustomSelect) => {
  const { value, label, onChange, options, fullWidth, error, ...rest } = props

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {((Array.isArray(value) && !value.length) || !value) && <CustomPlaceholder>{label}</CustomPlaceholder>}
      <StyledSelect
        labelId='demo-select-small-label'
        id='demo-select-small'
        value={value}
        label={label}
        onChange={onChange}
        fullWidth={fullWidth}
        error={error}
        {...rest}
      >
        {options?.length > 0 ? (
          options?.map(option => {
            return (
              <StyledMenuItem key={option.value} value={option.value}>
                {option.label}
              </StyledMenuItem>
            )
          })
        ) : (
          <StyledMenuItem value=''>No Data</StyledMenuItem>
        )}
      </StyledSelect>
    </Box>
  )
}

export default CustomeSelect
