import { createSelector } from 'reselect';

import { selectPlayed } from '../Player/selectors';

const selectComments = () => state => state.get('comments').sort((a, b) => a.timestamp > b.timestamp);

const selectOpen = () => createSelector(
  selectPlayed(), selectComments(),
  (played, comments) => comments.findLast(({ timestamp }) => timestamp <= played && timestamp > played - 5)
);

export {
  selectComments,
  selectOpen,
};
