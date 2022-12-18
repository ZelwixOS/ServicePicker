import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from 'tss-react/mui'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DevicesIcon from '@mui/icons-material/Devices';

import HiddenNavigation from './HiddenNavigation';

const useStyles = makeStyles()((theme) => ({
    logoButton: {
      fontSize: '30px',
      fontFamily: 'cursive',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    logoIcon: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

const NavigationBar: React.FC = () => {
  const { classes, cx } = useStyles()

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Grid item xs={12} sm={2}>
            <HiddenNavigation />
          </Grid>
          <Grid container justifyContent="flex-end" item xs={12} sm={10}>
            <Button
              variant="text"
              size="large"
              color="secondary"
              href="/"
              className={classes.logoButton}
              startIcon={<DevicesIcon />}
            >
              DTS
            </Button>
            <Button variant="text" size="large" color="secondary" href="/" className={classes.logoIcon}>
              <DevicesIcon />
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};
export default NavigationBar;
