import expect from 'expect';
import {
  playVideo,
  pauseVideo,
  updateLoaded,
  updatePlayed,
  updateDuration,
} from '../actions';
import {
  PLAY_VIDEO,
  PAUSE_VIDEO,
  UPDATE_PLAYED,
  UPDATE_LOADED,
  UPDATE_DURATION,
} from '../constants';

describe('Player actions', () => {
  describe('Play Action', () => {
    it('has a type of PLAY_VIDEO', () => {
      expect(playVideo()).toEqual({ type: PLAY_VIDEO });
    });
  });

  describe('Pause Action', () => {
    it('has a type of PAUSE_VIDEO', () => {
      expect(pauseVideo()).toEqual({ type: PAUSE_VIDEO });
    });
  });

  describe('Update played Action', () => {
    it('has a type of UPDATE_PLAYED with timestamp', () => {
      expect(updatePlayed(42)).toEqual({ type: UPDATE_PLAYED, timestamp: 42 });
    });
  });

  describe('Update loaded Action', () => {
    it('has a type of UPDATE_LOADED with timestamp', () => {
      expect(updateLoaded(42)).toEqual({ type: UPDATE_LOADED, timestamp: 42 });
    });
  });

  describe('Update duration Action', () => {
    it('has a type of UPDATE_DURATION with timestamp', () => {
      expect(updateDuration(42)).toEqual({ type: UPDATE_DURATION, timestamp: 42 });
    });
  });
});
