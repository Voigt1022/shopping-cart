import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Cart from './Cart/Cart';
import Login from './User/Login'
import Logout from './User/Logout'

import 'firebase/database';
import 'firebase/auth';

const useStyles = makeStyles({
  appbar: {
    backgroundColor: 'white'
  },
  title: {
    flexGrow: 1,
  },
  cart: {
    display: 'flex',
  }
});

const Appbar = ({ drawerstate, selection, size, user }) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar>
        <a href="https://github.com/Voigt1022/shopping-cart">
          <img src="data/github.svg" height="30" width="30"/>
        </a>
        {user ? <Logout selection={selection} size={size} user={user} /> : <Login />}
        <Typography className={classes.title}>
          
        </Typography>
        <Cart className={classes.cart} drawerstate={drawerstate} selection={selection} size={size} user={user} />
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;