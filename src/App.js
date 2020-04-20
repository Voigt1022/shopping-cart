import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';


const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth = "lg">
      <ProductGrid products = {products}/>
      </Container>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  grid: {
    // flexGrow: 1,
    marginTop: "300px",
  },

  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // },
  card: {
    width: "350px",
    height: "550px"
  },
  media: {
    height: "350px",
    width: "245px",
    marginLeft : "50px"
  },
}));

const sizes = ["S", "M", "L", "XL"]

const Selectsize = ({prodcut}) => {
  const classes = useStyles();

  return (
    <Container align = 'center' >
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      {sizes.map(size => 
        <Button key = {size} size = 'medium'>
          {size}
        </Button>
      )}
    </ButtonGroup>
  </Container>
  );
};

const Prodcut = ({product}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component = "img"
          image={"./products/"+product.sku+"_1.jpg"}
        />
        <CardContent>
          <Typography gutterBottom variant="body1" align = "center">
            {product.title}
          </Typography>
          <Typography gutterBottom variant="body2" align = "center">
            {product.description === "" ? "No Description" : product.description}
          </Typography>
          <Typography variant="h5" align = "center">
            {product.currencyFormat} {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        <Selectsize />
        <Button variant="contained" color = 'primary' size = 'large'>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

const ProductGrid = ({products}) => {
  const classes = useStyles();
  return (
    <div className={classes.gird}>
      <Grid container spacing={5} justify = "center">
        {products.map(product => 
          <Grid item key = {product.sku}>
            <Prodcut product = {product} />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default App;