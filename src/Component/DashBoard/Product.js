import React, { useState, useRef } from 'react'

import { Card, CardMedia, CardContent, CardActionArea } from '@material-ui/core';
import { Button, Typography, Popover } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SizePick from './SizePick'


const useStyles = makeStyles({
  card: {
    width: 350,
    height: 750
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  addbutton: {
    backgroundColor: 'black',
    color: 'white',
    width: 250,
    '&:hover': { backgroundColor: 'gray' }
  },
  size: {
    width: 250,
    height: 36,
    color: 'black',
    '&:hover': { backgroundColor: 'white' }
  },
  outofstockbutton: {
    width: 250,
    color: 'white',
    backgroundColor: "gray"
  }
});

const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};

const Product = ({ product, drawerstate, selection, size, user }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [selectedsize, setSelectedsize] = useState('');
  const popover = useRef();
  const classes = useStyles();

  let formattedPrice = formatPrice(product.price, product.currencyId);

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <h2 margin-block="0">{product.title}</h2>
        <Typography >
          <big>"{product.description}"</big>
        </Typography>
        <Typography align="center">
          <small>{product.currencyFormat + ' '}</small>
          <big >{formattedPrice.substr(0, formattedPrice.length - 3)}</big>
          <small>{formattedPrice.substr(formattedPrice.length - 3, 3)}</small>
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={"data/products/" + product.sku + "_1.jpg"}
      />
      
      <div className={classes.root}>
        <Typography align="center" className={classes.size} ref={popover}>
          {selectedsize}
        </Typography>
        <Popover
          open={anchorEl}
          anchorEl={popover.current}
          onClose={() => {
            setAnchorEl(false);
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <SizePick product={product} setAnchorEl={setAnchorEl} setSelectedsize={setSelectedsize} size={size} selection={selection} />
        </Popover>
        <Button
          className={classes.addbutton}
          disabled={(selectedsize !== '' && size[product.sku][selectedsize] === 0) || selection.selected.some(x => x.sku === product.sku && x.size === selectedsize && x[selectedsize] >= size[product.sku][selectedsize])}
          onClick={() => {
            if (selectedsize === '') {
              setAnchorEl(true);
            }
            else {
              drawerstate.setState(true);
              selection.addToggle(product, selectedsize, user);
            }
          }}
        >
          Pick Size & Add to Cart
          </Button>
      </div>
    </Card>
  )
}

export default Product;