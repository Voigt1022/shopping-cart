import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const sizelist = ['S', 'M', 'L', 'XL']

const useStyles = makeStyles({
  outofstockbutton: {
    width: 250,
    color: 'white',
    backgroundColor: "gray"
  }
});

const SizePick = ({ product, setAnchorEl, setSelectedsize, size, selection }) => {
  const classes = useStyles();

  return (
    (Object.keys(size).length !== 0 && size[product.sku]['S'] === 0 && size[product.sku]['M'] === 0 && size[product.sku]['L'] === 0 && size[product.sku]['XL'] === 0) ?
      <Button className={classes.outofstockbutton} disabled={true}>Out of Stock</Button> :
      sizelist.map(si =>
        <Button
          key={si}
          disabled={size[product.sku][si] === 0 || selection.selected.some(x => x.sku === product.sku && x.size === si && x[si] >= size[product.sku][si])}
          onClick={() => {
            setSelectedsize(si);
            setAnchorEl(false);
          }}
        >
          {si}
        </Button>
      )
  )
}



export default SizePick;