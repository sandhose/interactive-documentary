/*
 *
 * Player reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_PLAYING,
  UPDATE_PLAYED,
  UPDATE_LOADED,
  UPDATE_DURATION,
} from './constants';

const initialState = fromJS({
  playing: false,
  played: 0,
  loaded: 0,
  duration: 100,
});

function playerReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYING:
      return state.set('playing', action.playing);
    case UPDATE_PLAYED:
      return state.set('played', action.timestamp);
    case UPDATE_LOADED:
      return state.set('loaded', action.timestamp);
    case UPDATE_DURATION:
      return state.set('duration', action.timestamp);
    default:
      return state;
  }
}

export default playerReducer;
