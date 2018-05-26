import { VIDEO_SAVE_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    title: '',
    videoId: '',
    wishList : []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VIDEO_SAVE_SUCCESS:
    return { ...state, action: action.payload.wishList };
    default:
      return state;
  }
};