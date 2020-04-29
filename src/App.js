import React, { useEffect, useState } from 'react';

import Container from '@material-ui/core/Container';

import DashBoard from './Component/DashBoard/DashBoard';
import Appbar from './Component/Appbar/Appbar'
import FireBase from './Component/FireBase'
import Selection from './Component/Selection'

const db = FireBase.database().ref();

const App = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState(false);
  const [selected, setSelected, addToggle, deleteToggle, decreaseToggle] = Selection();
  const [size, setSize] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    FireBase.auth().onAuthStateChanged(setUser);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const responseData = await fetch('./data/products.json');
      const resData = await responseData.json();
      setData(Object.values(resData));
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) { setSize(snap.val()); }
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData) };
  }, [])

  return (
    <React.Fragment>
      <Appbar drawerstate={{ state, setState }} selection={{ selected, setSelected, addToggle, deleteToggle, decreaseToggle }} size={size} user={user} />
      <Container maxWidth='xl'>
        <DashBoard products={data} drawerstate={{ state, setState }} selection={{ selected, addToggle }} size={size} user={user} />
      </Container>
    </React.Fragment>
  );
};

export default App;