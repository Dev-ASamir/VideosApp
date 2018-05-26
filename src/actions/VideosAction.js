import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  VIDEO_FETCH_SUCCESS,
  VIDEO_SAVE_SUCCESS,
  FAVORITE_FETCH_SUCCESS,
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



export const videoSave = ({ title, videoId, uid , wishList  }) => {
  const { currentUser } = firebase.auth();
  return async (dispatch) => {
    await firebase.database().ref(`/users/${currentUser.uid}/videos`)
      .push({ title, videoId })
    //s  wishList.push(videoId)
   /* ((favorite) => {
      dispatch({
        type: VIDEO_SAVE_SUCCESS,
        payload: favorite
      });
      Actions.favoriteList();
    })*/
    .then(user => {
      console.log('successfully signed up at firebase');
    // dispatch({type:'ADD_TO_WISHLIST', payload : wishList});
    alert(JSON.stringify(wishList));
      console.log(user);
      
      videoSavedSuccessed(dispatch, user);
     // Actions.favoriteList();
  })
      .catch((error) => {
        console.error(error);
        alert("Error");
      });
  }
}

const videoSavedSuccessed = (dispatch, user) => {
  dispatch({
    type: VIDEO_SAVE_SUCCESS,
    payload: user
  })
}


export const favoriteFetch = () => {
  const { currentUser } = firebase.auth();
  return async (dispatch) => {
    await firebase.database().ref(`/users/${currentUser.uid}/videos`)
      .on('value', snapshot => {
        dispatch({ type: FAVORITE_FETCH_SUCCESS, payload: snapshot.val() })
      })
  }
}

const reshapeVideoData = videos => (
  videos.map(({ id, snippet }) => ({
    videoId: id ? id.videoId : '',
    title: snippet.title.length > 0 ? snippet.title : '',
    image: snippet && snippet.thumbnails && snippet.thumbnails.medium ? snippet.thumbnails.medium.url : ""
  }))
);



/*
export const videosFetch = () => {
    return (dispatch) => {

      right api 
         fetch("https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyBPR8Q0FwcrJhfMbFruKz5MrHIP6cvs7F8&playlistId=PLBCF2DAC6FFB574DE&part=snippet,id&order=date&maxResults=10")

         fake api
      fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyBPR8Q0FwcrJhfMbFruKz5MrHIP6cvs7F8&channelId=UCtlth0w7_mYqpHPViMhQ99Q&part=snippet,id&order=date&maxResults=20")
      .then((response) => response.json())
      .then(data => {
        var videoId = []
        data.items.forEach(function(item){
          videoId.push(item)
        })
        dispatch({ type: VIDEO_FETCH_SUCCESS, payload: videoId })
       // alert(data.items)
      //s alert(JSON.stringify(data.items))
      })
      .catch((error) => {
        console.error(error);
      });     
    }
  }
*/


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