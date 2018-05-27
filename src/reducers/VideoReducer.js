import { VIDEO_FETCH_SUCCESS, } from '../actions/types';
const INITIAL_STATE = {
    videos: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VIDEO_FETCH_SUCCESS:
            return { ...state, videos: action.payload };
        default:
            return state;
    }
};
