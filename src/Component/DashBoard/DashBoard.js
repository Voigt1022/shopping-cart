import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Product from './Product'

const useStyles = makeStyles({
  root: {
    margin: 10
  }
});

const DashBoard = ({ products, drawerstate, selection, size, user }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      spacing={3}
    >
      {products.map(product =>
        <Grid item key={product.sku}>
          <Product
            product={product}
            drawerstate={drawerstate}
            selection={selection}
            size={size}
            user={user} />
        </Grid>
      )
      }
    </Grid>
  );
};

export default DashBoard;