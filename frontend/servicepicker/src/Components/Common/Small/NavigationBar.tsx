import React, { useState, useEffect } from 'react'
import { makeStyles } from 'tss-react/mui'
import { AppBar, Toolbar, Grid, Button, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ColorizeIcon from '@mui/icons-material/Colorize'

import LoginModal from '../Big/LoginModal'
import UserMiniPanel from './UserMiniPanel'
import { getRole } from '../../../Requests/AccountRequests'
import Roles from '../../../Types/Roles'
import NavigationMenu from './NavigationMenu'

const useStyles = makeStyles()((theme) => ({
  buttons: {
    margin: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    opacity: 0.2,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
  inputRoot: {
    opacity: 1,
    color: '#000',
    padding: theme.spacing(0, 5),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  searchIcon: {
    color: '#999',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  largeObject: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  smallObject: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  realElement: {
    height: 25,
  },
}))

const NavigationBar: React.FC = () => {
  const [search, setSearch] = useState<string>('')
  const [isAuth, setAuth] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true
    checkAuth(isMounted)
    return () => {
      isMounted = false
    }
  })

  const onSearchChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const str = event.target.value as string
    setSearch(str)
  }

  const searchRequest = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      window.history.pushState({}, 'Service', `/?search=${search}`)
      window.location.replace(`/?search=${search}`)
    }
  }

  const checkAuth = async (isMounted: boolean) => {
    const authres = await getRole()

    if (isMounted) {
      if (authres !== Roles.guest) {
        sessionStorage.setItem('signed', authres)
        setAuth(true)
      } else {
        setAuth(false)
      }
      setLoaded(true)
    }
  }

  const { classes, cx } = useStyles()

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <NavigationMenu />
          <Grid item container xs={12} sm={4}>
            <Button
              variant="text"
              size="large"
              color="secondary"
              href="/"
              className={classes.logoButton}
              startIcon={<ColorizeIcon />}
            >
              ServicePicker
            </Button>
            <Button
              variant="text"
              size="large"
              color="secondary"
              href="/"
              className={classes.logoIcon}
            >
              <ColorizeIcon />
            </Button>
          </Grid>
          <Grid item container xs={12} sm={3}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onKeyDown={searchRequest}
                onChange={onSearchChange}
                value={search}
                placeholder="Поиск"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Grid>
          <Grid container item xs={12} sm={5} justifyContent="flex-end">
            {loaded && (isAuth ? <UserMiniPanel /> : <LoginModal />)}
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  )
}
export default NavigationBar
