/*
 *
 * Player actions
 *
 */

import {
  UPDATE_PLAYING,
  UPDATE_PLAYED,
  UPDATE_LOADED,
  UPDATE_DURATION,
} from './constants';

export function updatePlaying(playing) {
  return {
    type: UPDATE_PLAYING,
    playing,
  };
}

export function updateLoaded(timestamp) {
  return {
    type: UPDATE_LOADED,
    timestamp,
  };
}

export function updatePlayed(timestamp) {
  return {
    type: UPDATE_PLAYED,
    timestamp,
  };
}

export function updateDuration(timestamp) {
  return {
    type: UPDATE_DURATION,
    timestamp,
  };
}
