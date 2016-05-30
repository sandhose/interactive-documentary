import {
  selectPlayer,
  selectPlaying,
  selectPlayed,
  selectLoaded,
  selectDuration,
} from '../selectors';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('Player selectors', () => {
  describe('selectPlayer', () => {
    const playerSelector = selectPlayer();
    it('should select the player state', () => {
      const playerState = fromJS({});
      const mockedState = fromJS({
        player: playerState,
      });
      expect(playerSelector(mockedState)).toEqual(playerState);
    });
  });

  describe('selectPlaying', () => {
    const playingSelector = selectPlaying();
    it('should select the player state', () => {
      const playerState = fromJS({ playing: true });
      const mockedState = fromJS({
        player: playerState,
      });
      expect(playingSelector(mockedState)).toEqual(true);
    });
  });

  describe('selectPlayed', () => {
    const playedSelector = selectPlayed();
    it('should select the player state', () => {
      const playerState = fromJS({ played: 42 });
      const mockedState = fromJS({
        player: playerState,
      });
      expect(playedSelector(mockedState)).toEqual(42);
    });
  });

  describe('selectLoaded', () => {
    const loadedSelector = selectLoaded();
    it('should select the player state', () => {
      const playerState = fromJS({ loaded: 42 });
      const mockedState = fromJS({
        player: playerState,
      });
      expect(loadedSelector(mockedState)).toEqual(42);
    });
  });

  describe('selectDuration', () => {
    const durationSelector = selectDuration();
    it('should select the player state', () => {
      const playerState = fromJS({ duration: 42 });
      const mockedState = fromJS({
        player: playerState,
      });
      expect(durationSelector(mockedState)).toEqual(42);
    });
  });
});
