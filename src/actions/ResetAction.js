import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  NEW_EMAIL_CHANGED,
  //NEW_PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';

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
  Actions.login({ type: 'reset' });
};
