import { createSelector } from 'reselect';

import { selectPlayed } from '../Player/selectors';

const selectComments = () => state => state.get('comments');

const selectOpen = () => createSelector(
  selectPlayed(), selectComments(),
  (played, comments) => comments.reduce((a, b) => (b.timestamp <= played && b.timestamp > played - 5 && (!a || b.timestamp > a.timestamp) ? b : a), null)
);

export {
  selectComments,
  selectOpen,
};
