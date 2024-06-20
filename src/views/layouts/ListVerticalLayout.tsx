import React, { useState } from 'react'
import { NextPage } from 'next'
import List from '@mui/material/List'
import { ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import { VerticalItems } from 'src/configs/layout'
import SendIcon from '@mui/icons-material/Send'
import Collapse from '@mui/material/Collapse'

type TProps = {
  openStatus: boolean
  handleClick: () => void
}

const RecursiveListItems = ({ items, level }: { items: any; level: number }) => {
  const [openStatus, setOpenStatus] = useState<{ [key: string]: boolean }>({})
  const handleClick = (title: string) => {
    setOpenStatus(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  return (
    <>
      {items?.map((item: any) => {
        return (
          <React.Fragment key={item.title}>
            <ListItemButton
              sx={{
                padding: `8px 10px`,
                paddingLeft: `${level * 20}px`
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
              <ListItemText primary={item.title} />
            </ListItemButton>
            {item.children && item.children.length > 0 && (
              <>
                <Collapse key={item.title} in={openStatus[item.title]} timeout='auto' unmountOnExit>
                  <RecursiveListItems items={item.children} level={level + 1} />
                </Collapse>
              </>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}
const ListVerticalLayout: NextPage<TProps> = () => {
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
      <RecursiveListItems items={VerticalItems} level={1} />
    </List>
  )
}

export default ListVerticalLayout
