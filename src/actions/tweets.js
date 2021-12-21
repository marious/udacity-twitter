import { saveLikeToggle, saveTweet } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';
export const SET_TWEET_ID = 'SET_TWEET_ID';

export const setTweetId = id => {
  return {
    type: SET_TWEET_ID,
    id,
  };
};

export const receiveTweets = tweets => {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  };
};

export const addTweet = tweet => {
  return {
    type: ADD_TWEET,
    tweet,
  };
};

export function handleAddTweet(text, replyingTo) {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    const tweet = await saveTweet({
      text,
      author: authedUser,
      replyingTo,
    });
    dispatch(addTweet(tweet));
    return dispatch(hideLoading());
  };
}

export const toggleTweet = ({ id, authedUser, hasLiked }) => {
  return {
    type: 'TOGGLE_TWEET',
    id,
    authedUser,
    hasLiked,
  };
};

export const handleToggleTweet = info => async dispatch => {
  dispatch(toggleTweet(info));
  return saveLikeToggle(info).catch(e => {
    console.warn('Error in handle ToggleTweet: ', e);
    dispatch(toggleTweet(info));
    alert('The was an error liking the tweet. Try again.');
  });
};
