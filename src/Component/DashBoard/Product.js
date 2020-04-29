import React, { useState, useRef } from 'react'

import { Card, CardMedia, CardContent } from '@material-ui/core';
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
  sizebutton: {
    width: 250,
    color: 'black',
    '&:hover': { backgroundColor: 'light-gray' }
  },
  title: {
    fontWeight: 'bold'
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
  const [selectedsize, setSelectedsize] = useState('Open Size Chart');
  const [add, setAdd] = useState('Add to cart');
  const popover = useRef();
  const classes = useStyles();

  let formattedPrice = formatPrice(product.price, product.currencyId);

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Typography align="center" className={classes.title}>
          {product.title}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={"data/products/" + product.sku + "_1.jpg"}
      />
      <CardContent>
        <Typography align="center" className={classes.des}>
          <small>Detail:</small> 
          <big>{product.description }</big>
        </Typography>
        <Typography align="center">
          <small>{product.currencyFormat+' '}</small>
          <big>{formattedPrice.substr(0, formattedPrice.length - 3)}</big>
          <small>{formattedPrice.substr(formattedPrice.length - 3, 3)}</small>
        </Typography>
      </CardContent>
      <div className={classes.root}>
        <Button
          className={classes.sizebutton}
          ref={popover}
          onClick={() => setAnchorEl(true)}
        >
          {selectedsize}
        </Button>
        <Popover
          open={anchorEl}
          anchorEl={popover.current}
          onClose={() => setAnchorEl(false)}
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

        {/* <Button>
          <SizePick product={product} setAnchorEl={setAnchorEl} setSelectedsize={setSelectedsize} size={size} selection={selection} />
        </Button>  */}

        <Button
          className={classes.addbutton}
          disabled={(selectedsize !== 'Open Size Chart' && size[product.sku][selectedsize] === 0) || selection.selected.some(x => x.sku === product.sku && x.size === selectedsize && x[selectedsize] >= size[product.sku][selectedsize])}
          onClick={() => {
            if (selectedsize === 'Open Size Chart') {
              setAdd('Pick a Size first')
              setAnchorEl(true);
            }
            else {
              drawerstate.setState(true);
              selection.addToggle(product, selectedsize, user);
              setAdd('Add to cart');
            }
          }}
        >
          {add}
          </Button>
      </div>
    </Card>
  )
}

export default Product;