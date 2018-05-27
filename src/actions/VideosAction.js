import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  VIDEO_FETCH_SUCCESS,
  ADD_TO_WISHLIST,
  REMOVE_FORM_WISHLIST
} from './types';

export const videosFetch = () => {
  return (dispatch) => {
    fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyBPR8Q0FwcrJhfMbFruKz5MrHIP6cvs7F8&channelId=UCtlth0w7_mYqpHPViMhQ99Q&part=snippet,id&order=date&maxResults=20")
      .then((response) => response.json())
      .then(async (data) => {
        const videoData = await reshapeVideoData(data.items);
        dispatch({ type: VIDEO_FETCH_SUCCESS, payload: videoData })
      })
      .catch((error) => {
        console.error(error);
      });
  }
}


const reshapeVideoData = videos => (
  videos.map(({ id, snippet }) => ({
    videoId: id ? id.videoId : '',
    title: snippet.title.length > 0 ? snippet.title : '',
    image: snippet && snippet.thumbnails && snippet.thumbnails.medium ? snippet.thumbnails.medium.url : ""
  }))
);


export const addToWishList = ({video, wishlist})=>{
  return (dispatch)=>{
    const index = wishlist && wishlist.findIndex( item=>  item.videoId == video.videoId );
    if(index != -1){
      let myWishList =  wishlist.filter( item=>  item.videoId !== video.videoId );
      dispatch({ type : REMOVE_FORM_WISHLIST , payload : myWishList });
    }else{
      dispatch({ type : ADD_TO_WISHLIST , payload : video });

    }
  }
}