import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, MenuItem, Typography } from '@mui/material';

import Roles from '../../../Types/Roles';
import { getRole } from '../../../Requests/AccountRequests';

const HiddenNavigation = () => {
  const [state, setState] = React.useState(false);
  const [role, setRole] = React.useState('');

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const onMenuItemClick = (loc: string) => {
    window.location.href = loc;
  };

  const categories = onMenuItemClick.bind(this, '/admin/categories');
  const clients = onMenuItemClick.bind(this, '/admin/clients');
  const services = onMenuItemClick.bind(this, '/admin/services');

  const menuItem = (name: string, click: () => void) => (
    <MenuItem onClick={click}>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">{name}</Typography>
        </ListItemText>
      </ListItem>
    </MenuItem>
  );

  React.useEffect(() => {
    let isMounted = true;
    checkAuth(isMounted);
    return () => {
      isMounted = false;
    };
  });

  const checkAuth = async (isMounted: boolean) => {
    const authres = await getRole();
    setRole(authres);
    if (isMounted) {
      if (authres !== Roles.guest) {
        sessionStorage.setItem('signed', authres);
      }
    }
  };

  return (
    <div>
      <IconButton color="secondary" aria-label="menu" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
        {role === 'Admin' && (
          <List>
            {menuItem('??????????????????', categories)}
            <Divider />
            {menuItem('??????????????', services)}
            <Divider />
            {menuItem('??????????????', clients)}
          </List>
        )}
      </Drawer>
    </div>
  );
};

export default HiddenNavigation;
