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
  const commonCategories = onMenuItemClick.bind(this, '/admin/commonCategories');
  const parameterBlocks = onMenuItemClick.bind(this, '/admin/parameterBlocks');
  const parameters = onMenuItemClick.bind(this, '/admin/parameters');
  const workers = onMenuItemClick.bind(this, '/admin/workers');
  const clients = onMenuItemClick.bind(this, '/admin/clients');
  const products = onMenuItemClick.bind(this, '/admin/product');
  const regions = onMenuItemClick.bind(this, '/admin/regions');
  const outlets = onMenuItemClick.bind(this, '/admin/outlets');
  const warehouses = onMenuItemClick.bind(this, '/admin/warehouses');

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
            {menuItem('Обобщающие категории', commonCategories)}
            <Divider />
            {menuItem('Категории', categories)}
            <Divider />
            {menuItem('Блоки параметров', parameterBlocks)}
            <Divider />
            {menuItem('Параметры', parameters)}
            <Divider />
            {menuItem('Продукты', products)}
            <Divider />
            {menuItem('Работники', workers)}
            <Divider />
            {menuItem('Клиенты', clients)}
            <Divider />
            {menuItem('Регионы', regions)}
            <Divider />
            {menuItem('Магазины', outlets)}
            <Divider />
            {menuItem('Склады', warehouses)}
          </List>
        )}
      </Drawer>
    </div>
  );
};

export default HiddenNavigation;
