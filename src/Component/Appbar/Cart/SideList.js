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
  shoppinglist: {
    height: props => props.height - 190,
    overflow: 'auto',
  },
  cartbutton: {
    color: 'black'
  },
  card: {
    display: 'flex',

  },
  cardcontent: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 200,
  },
  cardmedia: {
    width: 49.5,
    height: 72,
    marginTop: 18,
    marginLeft: 5,
  },
  clearbutton: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 15,
    marginLeft: 60
  },
  adjustbutton: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 45,
    marginLeft: -26
  },
  checkout: {
    display: 'flex',
    flex: 'wrap',
    margin: 10,
  },
  checkoutprice: {
    flexGrow: 1
  },
  checkoutbutton: {
    textAlign: 'center',
  },
  checkoutbuttonself: {
    marginTop: 10,
    fontSize: 20,
    width: 350,
    backgroundColor: props => props.totalCost ? 'black' : 'white',
    color: 'black',
    '&:hover': { backgroundColor: 'black' }
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