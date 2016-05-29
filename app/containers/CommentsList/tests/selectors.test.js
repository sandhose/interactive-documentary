import {
  selectComments,
  selectOpen,
} from '../selectors';
import { Comment } from '../reducer';
import { List, Map } from 'immutable';
import expect from 'expect';

const comments = List.of(new Comment({ timestamp: 1 }), new Comment({ timestamp: 2 }), new Comment({ timestamp: 3 }));

describe('selectComments', () => {
  const selector = selectComments();

  it('should select the comments in the state', () => {
    expect(selector(new Map({ comments }))).toEqual(comments);
  });

  it('should select the comments ordered by timestamp', () => {
    expect(selector(new Map({ comments: comments.reverse() }))).toEqual(comments);
  });
});

describe('selectOpen', () => {
  const selector = selectOpen();
  const state = new Map({
    comments,
    player: new Map(),
  });

  it('should select the opened comment', () => {
    expect(selector(state.setIn(['player', 'played'], 1))).toEqual(comments.get(0));
  });

  it('should select the last opened comment', () => {
    expect(selector(state.setIn(['player', 'played'], 2))).toEqual(comments.get(1));
  });

  it('should not select any opened comment after', () => {
    expect(selector(state.setIn(['player', 'played'], 0))).toEqual(undefined);
  });

  it('should not select any opened comment before', () => {
    expect(selector(state.setIn(['player', 'played'], 10))).toEqual(undefined);
  });
});
