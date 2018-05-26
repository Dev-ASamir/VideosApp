  import {
    VIDEO_SELECED
  } from './types';
  export const selectVideo = (videoId) => {
    return {
      type: VIDEO_SELECED,
      payload: videoId
    };
  };
