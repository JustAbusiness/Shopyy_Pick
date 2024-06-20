import * as React from 'react'
import { NextPage } from 'next'
import List from '@mui/material/List'
import { IconButton, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import { VerticalItems } from 'src/configs/layout'
import SendIcon from '@mui/icons-material/Send'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'

type TProps = {
  openStatus: boolean
  handleClick: () => void
}

const ListVerticalLayout: NextPage<TProps> = ({ openStatus, handleClick }) => {
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
      {VerticalItems?.map(item => {
        return (
          <React.Fragment key={item.title}>
            <ListItemButton
              onClick={() => {
                if (item.children) {
                  handleClick()
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
                {item.children.map(child => {
                  return (
                    <Collapse key={child.title} in={openStatus} timeout='auto' unmountOnExit>
                      <List component='div' disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText primary={child.title} />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  )
                })}
              </>
            )}
          </React.Fragment>
        )
      })}
    </List>
  )
}

export default ListVerticalLayout
