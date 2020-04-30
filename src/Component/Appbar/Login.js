import React, { useState, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover'

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const useStyles = makeStyles({
  popover: {
    marginTop: 5,
    marginLeft: -120,
  },
});

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};


const Login = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const popover = useRef();
  const classes = useStyles();

  return (
    <React.Fragment>
      <Button
        ref={popover}
        color="black"
        size="large"
        onClick={() => setAnchorEl(true)}
      >
        Log in
        </Button>
      <Popover
        className={classes.popover}
        open={anchorEl}
        anchorEl={popover.current}
        onClose={() => setAnchorEl(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Popover>
    </React.Fragment>
  )
}



export default Login;