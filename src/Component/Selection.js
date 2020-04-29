import { useState } from 'react';

import FireBase from './FireBase'

const db = FireBase.database().ref();

const Selection = () => {
  const [selected, setSelected] = useState([]);
  const addToggle = (item, si, user) => {
    if (selected.some(x => x.sku === item.sku && x.size === si)) {
      let pos = selected.findIndex(x => x.sku === item.sku && x.size === si);
      selected[pos] = { ...selected[pos], [si]: selected[pos][si] + 1 }
      setSelected([...selected]);
      if (user) {
        db.child('carts/' + user.uid).set(selected);
      }
    }
    else {
      let quan = { size: si, [si]: 1 }
      let temp = selected.concat([Object.assign(quan, item)])
      setSelected(temp);
      if (user) {
        db.child('carts/' + user.uid).set(temp);
      }
    }
  }
  const deleteToggle = (item, si, user) => {
    let temp = selected.filter(x => x.sku !== item.sku || x.size !== si);
    setSelected(temp);
    if (user) {
      db.child('carts/' + user.uid).set(temp);
    }
  }
  const decreaseToggle = (item, si, user) => {
    let pos = selected.findIndex(x => x.sku === item.sku && x.size === si);
    if (selected[pos][si] > 1) {
      selected[pos] = { ...selected[pos], [si]: selected[pos][si] - 1 }
      setSelected([...selected]);
      if (user) {
        db.child('carts/' + user.uid).set(selected);
      }
    }
  }
  return [selected, setSelected, addToggle, deleteToggle, decreaseToggle];
}

export default Selection;