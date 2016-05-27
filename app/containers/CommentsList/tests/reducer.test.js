import expect from 'expect';
import commentsListReducer from '../reducer';

describe('commentsListReducer', () => {
  it('returns the initial state', () => {
    expect(commentsListReducer(undefined, {})).toEqual({});
  });
});
