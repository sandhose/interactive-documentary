import expect from 'expect';
import playerReducer from '../reducer';

import { fromJS } from 'immutable';

describe('playerReducer', () => {
  it('returns the initial state', () => {
    const initialState = fromJS({
      id: 'EjaGktVQdNg',
      state: 'PAUSED',
      played: 0,
      loaded: 0,
      duration: 0,
    });
    expect(playerReducer(undefined, {})).toEqual(initialState);
  });
});
