import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  NAME_CREATED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  NEW_EMAIL_CHANGED,
} from './types';


export const nameCreated = (text) => {
  return {
    type: NAME_CREATED,
    payload: text
  };
};


export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};


export const signedIn = ({ email, password, name }) => {

  if (name.length < 3 || name.charAt(0)===' ' ) return (dispatch) => { loginUserFail(dispatch) };
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    console.log('calling sign up');
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('successfully signed up at firebase');
        console.log(user);
        dispatch(createCloudUser(user, email, password, name));
        loginUserSuccess(dispatch, user);
      })
      .catch(() => loginUserFail(dispatch))
  }

};

export const createCloudUser = (user, email, password, name) => {
  return async (dispatch) => {
    console.log('calling firebase toake new user cloud');
    await firebase.database().ref(`/users/${user.uid}/`)
      .push({ name, email, password })
      .then((snapshot) => {
        console.log('successfully created user on the cloud');
      })
  }
}

export const newEmailChanged = (text) => {
  return {
    type: NEW_EMAIL_CHANGED,
    payload: text
  };
};

export const Reseted = ({ email }) => {
    return (dispatch) => {
      dispatch({ type: LOGIN_USER });
      firebase.auth().sendPasswordResetEmail(email)
        .then(user => resetPassword(dispatch, user))
        .catch(() => loginUserFail(dispatch));
    };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFail(dispatch));
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.homePage({ type: 'reset' });
};


const resetPassword = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.login({ type: 'reset' });
};
