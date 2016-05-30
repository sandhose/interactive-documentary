import expect from 'expect';
import playerReducer from '../reducer';
import {
  UPDATE_PLAYING,
  UPDATE_PLAYED,
  UPDATE_LOADED,
  UPDATE_DURATION,
} from '../constants';

import { fromJS } from 'immutable';

describe('playerReducer', () => {
  it('returns the initial state', () => {
    const initialState = fromJS({
      playing: false,
      played: 0,
      loaded: 0,
      duration: 100,
    });
    expect(playerReducer(undefined, {})).toEqual(initialState);
  });

  it('should update the playing prop', () => {
    expect(playerReducer(undefined, {
      type: UPDATE_PLAYING,
      playing: true,
    }).get('playing')).toEqual(true);

    expect(playerReducer(undefined, {
      type: UPDATE_PLAYING,
      playing: false,
    }).get('playing')).toEqual(false);
  });

  it('should update the played prop', () => {
    expect(playerReducer(undefined, {
      type: UPDATE_PLAYED,
      timestamp: 42,
    }).get('played')).toEqual(42);

    expect(playerReducer(undefined, {
      type: UPDATE_PLAYED,
      timestamp: 12,
    }).get('played')).toEqual(12);
  });

  it('should update the duration prop', () => {
    expect(playerReducer(undefined, {
      type: UPDATE_DURATION,
      timestamp: 42,
    }).get('duration')).toEqual(42);

    expect(playerReducer(undefined, {
      type: UPDATE_DURATION,
      timestamp: 12,
    }).get('duration')).toEqual(12);
  });

  it('should update the loaded prop', () => {
    expect(playerReducer(undefined, {
      type: UPDATE_LOADED,
      timestamp: 42,
    }).get('loaded')).toEqual(42);

    expect(playerReducer(undefined, {
      type: UPDATE_LOADED,
      timestamp: 12,
    }).get('loaded')).toEqual(12);
  });
});
