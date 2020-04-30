import React,{useState,useLayoutEffect} from 'react'

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

import SideList from './SideList'

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Cart = ({drawerstate,selection,size,user}) => {
  const [width, height] = useWindowSize();
  let totalNum = 0;
   if(selection.selected.length>=1){
     selection.selected.forEach(item=>totalNum=totalNum+item[item.size]);
   }

  return(
    <div>
      <IconButton 
        color="black" 
        onClick={() => drawerstate.setState(true)} 
        aira-label="add to shopping cart"
      >
        <Badge badgeContent={totalNum} color='black'>
        <AddShoppingCartIcon fontSize="large"/>
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerstate.state}
      >
      <SideList drawerstate={drawerstate} selection={selection} size={size} user={user} totalNum={totalNum} height={height}/>
      </Drawer>
    </div>
  );
};

export default Cart;