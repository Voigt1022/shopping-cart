import React, { useState, useEffect, useLayoutEffect } from 'react'
// @material-ui
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

import ShoppingList from './ShoppingList'

const useStyles = makeStyles({
  list: {
    width: 380,
  },
  cartbutton: {
    color: 'black'
  }
});

const SideList = ({ drawerstate, selection, size, user, totalNum, height }) => {
  const classes = useStyles(height);

  return (
    <div className={classes.list}>
      <Grid container>
        <Grid item xs={5}>
          <IconButton onClick={() => drawerstate.setState(false)} aira-label="close shopping cart">
            <CloseIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={7}>
          <IconButton aira-label="shopping cart" disabled={true}>
            <Badge badgeContent={totalNum} color='secondary'>
              <ShoppingCartIcon className={classes.cartbutton} fontSize="large" />
            </Badge>
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <ShoppingList selection={selection} size={size} user={user} height={height} />
    </div>
  );
};

export default SideList;