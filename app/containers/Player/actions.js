/*
 *
 * Player actions
 *
 */

import {
  PLAY_VIDEO,
  PAUSE_VIDEO,
  UPDATE_PLAYED,
  UPDATE_LOADED,
  UPDATE_DURATION,
} from './constants';

export function playVideo() {
  return {
    type: PLAY_VIDEO,
  };
}

export function pauseVideo() {
  return {
    type: PAUSE_VIDEO,
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
