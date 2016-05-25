/*
 *
 * Player reducer
 *
 */

import { fromJS } from 'immutable';
import {
  PLAY_VIDEO,
  PAUSE_VIDEO,
  UPDATE_PLAYED,
  UPDATE_LOADED,
  UPDATE_DURATION,
} from './constants';

const initialState = fromJS({
  id: 'EjaGktVQdNg',
  state: 'PAUSED',
  played: 0,
  loaded: 0,
  duration: 0,
});

function playerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_VIDEO:
      return state.set('state', 'PLAYING');
    case PAUSE_VIDEO:
      return state.set('state', 'PAUSED');
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
