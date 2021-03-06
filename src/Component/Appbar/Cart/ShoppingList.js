import React, { useState, useEffect, useLayoutEffect } from 'react'
// @material-ui
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';

import firebase from 'firebase/app';
import 'firebase/database';

const useStyles = makeStyles({
  shoppinglist: {
    height: props => props.height - 190,
    overflow: 'auto',
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
  checkoutbuttonself: {
    marginTop: 10,
    fontSize: 20,
    width: 250,
    backgroundColor: props => props.totalCost ? 'black' : 'white',
    color: 'white',
    '&:hover': { backgroundColor: 'black' }
  }
});

const ShoppingList = ({ selection, size, user, height }) => {
  let totalCost = 0;
  if (selection.selected.length >= 1) {
    selection.selected.forEach(item => totalCost = totalCost + item[item.size] * item.price);
  }
  const classes = useStyles({ totalCost, height });

  useEffect(() => {
    const notification = () => {
      selection.selected.forEach(item => {
        if (size[item.sku][item.size] === 0) {
          alert(`The item ${item.title} you selected is unavailable, please remove it`)
          item[item.size] = 0;
        }
        else if (item[item.size] > size[item.sku][item.size]) {
          alert(`The amount of the item ${item.title} you selected exceeds the available amount, because someone bought it, so it is adjusted to the maximum amount.`)
          item[item.size] = size[item.sku][item.size];
        }
      })
      if (user) {
        firebase.database().ref().child('carts/' + user.uid).set(selection.selected)
      }
      selection.setSelected([...selection.selected])
    }
    notification();
  }, [size.checkout])

  return (
    <React.Fragment>
      <div className={classes.shoppinglist}>
        {selection.selected.map(item =>
          <Card key={item.sku + item.size} className={classes.card}>
            <CardMedia
              className={classes.cardmedia}
              component="img"
              image={"data/products/" + item.sku + "_1.jpg"}
              alt="product image"
            />
            <CardContent className={classes.cardcontent}>
              <Typography variant="subtitle2">
                {item.title}
              </Typography>
              <Typography variant="caption">
                $ {item.price.toFixed(2)} | size: {item.size}
              </Typography>
              <Typography variant="caption">
                Quantity: {item[item.size]}
              </Typography>
              <Typography variant="caption">
                Price: $ {(item.price * item[item.size]).toFixed(2)}
              </Typography>
            </CardContent>
            <div className={classes.clearbutton}>
              <IconButton
                size="small"
                onClick={() => selection.deleteToggle(item, item.size, user)}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
              <div className={classes.adjustbutton}>
                <IconButton
                  className={classes.addbutton}
                  size="small"
                  disabled={item[item.size] >= size[item.sku][item.size]}
                  onClick={() => selection.addToggle(item, item.size, user)}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  disabled={item[item.size] <= 1}
                  onClick={() => selection.decreaseToggle(item, item.size, user)}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>
              </div>
            </div>
          </Card>
        )}
      </div>
      <Divider />
      <div align="center">
        <Typography variant="h6">
          ${totalCost.toFixed(2)}
        </Typography>
        <Button
          disabled={totalCost === 0}
          className={classes.checkoutbuttonself}
          onClick={() => {
            alert(`Subtotal: $ ${totalCost.toFixed(2)}`)
            selection.selected.forEach(item => {
              firebase.database().ref().child(item.sku).transaction(amount => { return { ...amount, [item.size]: size[item.sku][item.size] - item[item.size] } })
            })
            selection.setSelected([]);
            if (user) { firebase.database().ref().child('carts/' + user.uid).set([]) }
            firebase.database().ref().child('checkout').transaction(value => !value);
          }}
        >
          Checkout
        </Button>
      </div>
    </React.Fragment>
  );
};

export default ShoppingList;