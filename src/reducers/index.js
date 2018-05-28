import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import VideoReducer from './VideoReducer';
import WishListReducer from './WishListReducer';


export default combineReducers({
  auth: AuthReducer,
  videos: VideoReducer,
  wishlist : WishListReducer,
});
