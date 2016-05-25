import { createSelector } from 'reselect';

const selectPlayer = () => state => state.get('player');

const selectState = () => createSelector(
  selectPlayer(),
  playerState => playerState.get('state')
);

const selectId = () => createSelector(
  selectPlayer(),
  playerState => playerState.get('id')
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
  selectState,
  selectId,
  selectPlayed,
  selectLoaded,
  selectDuration,
};
