import React from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 300,
      height: 600,
    },
    media: {
      height: 400,
    },
    title: {
        height: 10,
        marginBottom: 20,
        textAlign: "center",
    },
    description: {
        height: 30,
        textAlign: "center",
    },
    price: {
        height: 20,
        textAlign: "center",
    },
    button: {
        background: '#2F4F4F',
        color: 'white'
    },
    title: {
      flexGrow: 1
    },
    hide: {
      display: "none"
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginRight: -drawerWidth
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginRight: 0
    }
  }));

const ProductCard = ({product}) => {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };
  
    return (

        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={"data/products/"+product.sku+"_1.jpg"}
        />
        <CardContent>
          <Typography className={classes.title} gutterBottom variant="p" component="h2" >
            {product.title}
          </Typography>

          <Typography className={classes.description} component="h2">
            {product.description}
          </Typography>

          <Typography className={classes.price} variant="h6" component="h2">
            {"$" + product.price}
          </Typography>

        </CardContent>

      </CardActionArea>

      <div>
        <CardActions>
              <Button className={classes.button} onClick={handleDrawerOpen} >
                S
              </Button>
              <Button className={classes.button} onClick={handleDrawerOpen}>
                M
              </Button>
              <Button className={classes.button} onClick={handleDrawerOpen}>
                L
              </Button>
              <Button className={classes.button} onClick={handleDrawerOpen}>
                XL
              </Button>

          </CardActions>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            <Typography variant="h6" noWrap className={classes.title}>
              Cart
            </Typography>
          </IconButton>
        </div>
        <Divider />
        <p> s</p>
        
      </Drawer>
      </div>
      
    </Card>
    
      );
  };
  
  export default ProductCard;