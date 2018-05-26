import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  NAME_CREATED,
  EMAIL_CREATED,
  PASSWORD_CREATED,
  LOGIN_USER_SUCCESSED,
  LOGIN_USER_FAILED,
  SIGNED_IN
} from './types';

export const nameCreated = (text) => {
  return {
    type: NAME_CREATED,
    payload: text
  };
};

export const emailCreated = (text) => {
  return {
    type: EMAIL_CREATED,
    payload: text
  };
};

export const passwordCreated = (text) => {
  return {
    type: PASSWORD_CREATED,
    payload: text
  };
};

export const signedIn = ({ email, password, name }) => {

if(!name) return (dispatch)  => { loginUserFailed(dispatch)};
    return (dispatch) => {
      dispatch({type: SIGNED_IN});
      console.log('calling sign up');
      firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
              console.log('successfully signed up at firebase');
              console.log(user);
              dispatch(createCloudUser(user, email, password, name));
              loginUserSuccessed(dispatch, user);
          })
          .catch(() => loginUserFailed(dispatch))
  }

};

const loginUserFailed = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAILED });
  alert("no")
};

const loginUserSuccessed = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESSED,
    payload: user
  });
  Actions.homePage({type: 'reset' });
/*
  Alert.alert(
    'Your register has been done',
    [
     // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
     // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => Actions.homePage()},
    ],
    { cancelable: false }
  )*/

};


export const createCloudUser = (user, email, password, name) => {
  return async (dispatch) => {
    alert("created = > " + name)
      console.log('calling firebase toake new user cloud');
      await  firebase.database().ref(`/users/${user.uid}/`)
          .push({name, email, password})
          .then((snapshot) => {
              console.log('successfully created user on the cloud');
          })

          
          //.catch(() => loginUserFailed(dispatch));
  }
}