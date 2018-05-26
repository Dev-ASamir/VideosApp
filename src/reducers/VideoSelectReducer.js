import {
  VIDEO_SELECED
} from '../actions/types';

const INITIAL_STATE = {

};

export default (state = null, action) => {
    switch (action.type) {
      case VIDEO_SELECED:
        return action.payload;
      default:
        return state;
    }
  };
  