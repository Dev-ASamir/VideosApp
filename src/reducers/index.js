import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';
import RegisterReucer from './RegisterReucer';
import VideoReducer from './VideoReducer';
import VideoSelectReducer from './VideoSelectReducer'
import FavoriteReducer from './FavoriteReducer'
import FavoriteSaved from './FavoriteSaved';
import WishListReducer from './WishListReducer';



export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  employees : EmployeeReducer,
  userdata : RegisterReucer,
  videos: VideoReducer,
  selectedVideoId : VideoSelectReducer,
  favorite : FavoriteReducer,
  favoriteSaved : FavoriteSaved,
  wishlist : WishListReducer
});
