import {
    NAME_CREATED,
    EMAIL_CREATED,
    PASSWORD_CREATED,
    LOGIN_USER_SUCCESSED,
    LOGIN_USER_FAILED,
    SIGNED_IN
  } from '../actions/types';
  
  const INITIAL_STATE = {
    name:'',
    email: '',
    password: '',
    user: null,
    error: '',
    loading: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case NAME_CREATED:
        return { ...state, name: action.payload };  
      case EMAIL_CREATED:
        return { ...state, email: action.payload };
      case PASSWORD_CREATED:
        return { ...state, password: action.payload };
      case SIGNED_IN:
        return { ...state, loading: true, error: '' };
      case LOGIN_USER_SUCCESSED:
        return { ...state, ...INITIAL_STATE, user: action.payload };
      case LOGIN_USER_FAILED:
        return { ...state, error: 'Authentication Failed.', password: '', loading: false };
      default:
        return state;
    }
  };
  