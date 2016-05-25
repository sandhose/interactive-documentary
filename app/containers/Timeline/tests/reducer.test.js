import expect from 'expect';
import timelineReducer from '../reducer';

import { fromJS } from 'immutable';

describe('timelineReducer', () => {
  it('returns the initial state', () => {
    expect(timelineReducer(undefined, {})).toEqual(fromJS({}));
  });
});
