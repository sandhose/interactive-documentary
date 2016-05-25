import { createSelector } from 'reselect';

const selectPlayer = () => state => state.get('player');

const selectPlaying = () => createSelector(
  selectPlayer(),
  playerState => playerState.get('playing')
);

const selectPlayed = () => createSelector(
  selectPlayer(),
  playerState => playerState.get('played')
);

const selectLoaded = () => createSelector(
  selectPlayer(),
  playerState => playerState.get('loaded')
);

const selectDuration = () => createSelector(
  selectPlayer(),
  playerState => playerState.get('duration')
);

export {
  selectPlayer,
  selectPlaying,
  selectPlayed,
  selectLoaded,
  selectDuration,
};
