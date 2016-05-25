// import { createSelector } from 'reselect';

const selectTimeline = () => state => state.get('Timeline');

export {
  selectTimeline,
};
