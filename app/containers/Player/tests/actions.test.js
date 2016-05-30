import expect from 'expect';
import {
  updatePlaying,
  updateLoaded,
  updatePlayed,
  updateDuration,
} from '../actions';
import {
  UPDATE_PLAYING,
  UPDATE_PLAYED,
  UPDATE_LOADED,
  UPDATE_DURATION,
} from '../constants';

describe('Player actions', () => {
  describe('Update playing Action', () => {
    it('has a type of UPDATE_PLAYING', () => {
      expect(updatePlaying().type).toEqual(UPDATE_PLAYING);
    });

    it('should have a playing prop', () => {
      expect(updatePlaying(true).playing).toEqual(true);
      expect(updatePlaying(false).playing).toEqual(false);
    });
  });

  describe('Update played Action', () => {
    it('has a type of UPDATE_PLAYED', () => {
      expect(updatePlayed().type).toEqual(UPDATE_PLAYED);
    });

    it('should have a timestamp prop', () => {
      expect(updatePlayed(42).timestamp).toEqual(42);
    });
  });

  describe('Update loaded Action', () => {
    it('has a type of UPDATE_LOADED', () => {
      expect(updateLoaded().type).toEqual(UPDATE_LOADED);
    });

    it('should have a timestamp prop', () => {
      expect(updateLoaded(42).timestamp).toEqual(42);
    });
  });

  describe('Update duration Action', () => {
    it('has a type of UPDATE_DURATION', () => {
      expect(updateDuration().type).toEqual(UPDATE_DURATION);
    });

    it('should have a timestamp prop', () => {
      expect(updateDuration(42).timestamp).toEqual(42);
    });
  });
});
