import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, MenuItem, Typography } from '@mui/material'

import { getAllCategories } from '../../../Requests/GetRequests'
import Category from '../../../Types/Category'

const NavigationMenu = () => {
  const [state, setState] = React.useState(false)
  const [categories, setCategories] = React.useState([] as Category[])

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState(open)
  }

  const onMenuItemClick = (loc: string) => {
    window.location.href = loc
  }
  
  const menuItem = (name: string, key: number, click: () => void) => (
    <MenuItem onClick={click} key={key}>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">{name}</Typography>
        </ListItemText>
      </ListItem>
    </MenuItem>
  )

  React.useEffect(() => {
    let isMounted = true
    getCategories(isMounted)
    return () => {
      isMounted = false
    }
  }, [])

  const getCategories = async (isMounted: boolean) => {
    const res = await getAllCategories(false)
    if (isMounted) {
      setCategories(res)
    }
  }

  return (
    <div>
      <IconButton
        color="secondary"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
        <List>
          {categories?.map(
            (c, ind) =>
              ind < 10 &&
              menuItem(
                c.name,
                ind,
                onMenuItemClick.bind(this, `/category/${c.id}`),
              ),
          )}
          <MenuItem onClick={onMenuItemClick.bind(this, '/categories/')}>
            <ListItem>
              <ListItemText>
                <Typography variant="h6">Все категории...</Typography>
              </ListItemText>
            </ListItem>
          </MenuItem>
        </List>
      </Drawer>
    </div>
  )
}

export default NavigationMenu
