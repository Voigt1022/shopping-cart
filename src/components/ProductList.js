import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import ProductCard from './ProductCard.js'

const useStyles = makeStyles({
    root: {
      maxWidth: 250,
      height: 350,
    },
    media: {
      height: 140,
    },
  });

  const ProductList = ({products}) => {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
  
    return (

        <React.Fragment>
            <Container>
                <Grid container spacing={2} direction="row">
                    {products.map(product => 
                     <Grid item xs={3}>
                        <ProductCard product={product} key={products.sku}></ProductCard>
                    </Grid>
                    )}
                </Grid>
            </Container>
        </React.Fragment>
      );
  };
  
  export default ProductList;