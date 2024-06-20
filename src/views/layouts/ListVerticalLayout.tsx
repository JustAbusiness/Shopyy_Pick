import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import List from '@mui/material/List'
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import { VerticalItems } from 'src/configs/layout'
import SendIcon from '@mui/icons-material/Send'
import Collapse from '@mui/material/Collapse'

type TProps = {
  open: boolean
}

type TListItems = {
  level: number
  openStatus: { [key: string]: boolean }
  items: any
  setOpenStatus: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
  disabled: boolean
}

const RecursiveListItems: NextPage<TListItems> = ({ items, level, disabled, setOpenStatus, openStatus }) => {
  const handleClick = (title: string) => {
    if (!disabled) {
      setOpenStatus(prev => ({
        ...prev,
        [title]: !prev[title]
      }))
    }
  }

  return (
    <>
      {items?.map((item: any) => {
        return (
          <React.Fragment key={item.title}>
            <ListItemButton
              sx={{
                padding: `8px 10px 8px ${level * level === 1 ? 10 : 40}px`
              }}
              onClick={() => {
                if (item.children) {
                  handleClick(item.title)
                }
              }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              {!disabled && <ListItemText primary={item.title} />}
            </ListItemButton>
            {item.children && item.children.length > 0 && (
              <>
                <Collapse key={item.title} in={openStatus[item.title]} timeout='auto' unmountOnExit>
                  <RecursiveListItems
                    items={item.children}
                    level={level + 1}
                    openStatus={openStatus}
                    setOpenStatus={setOpenStatus}
                    disabled={disabled}
                  />
                </Collapse>
              </>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}
const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
  const [openStatus, setOpenStatus] = useState<{ [key: string]: boolean }>({})
  useEffect(() => {
    if (!open) {
      setOpenStatus({})
    }
  }, [open])

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          Nested List Items
        </ListSubheader>
      }
    >
      <RecursiveListItems
        items={VerticalItems}
        level={1}
        openStatus={openStatus}
        setOpenStatus={setOpenStatus}
        disabled={!open}
      />
    </List>
  )
}

export default ListVerticalLayout
