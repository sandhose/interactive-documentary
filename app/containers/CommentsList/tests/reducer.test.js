import expect from 'expect';
import { List } from 'immutable';
import commentsListReducer, { initialState, Comment } from '../reducer';
import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from '../constants';

describe('commentsListReducer', () => {
  it('should return the initial state', () => {
    expect(commentsListReducer(undefined, {})).toEqual(initialState);
  });

  describe('ADD_COMMENT', () => {
    it('should add a comment', () => {
      const nextState = commentsListReducer(new List(), {
        type: ADD_COMMENT,
        brief: 'beep',
        content: 'boop',
        timestamp: 42,
      });

      expect(nextState.last().toJS()).toEqual({
        id: 0,
        brief: 'beep',
        content: 'boop',
        timestamp: 42,
      });
    });

    it('should use the next id as new comment id', () => {
      const nextState = commentsListReducer(List.of(new Comment({ id: 41 })), {
        type: ADD_COMMENT,
      });

      expect(nextState.last().id).toEqual(42);
    });
  });

  describe('EDIT_COMMENT', () => {
    it('should edit a comment', () => {
      const nextState = commentsListReducer(List.of(new Comment({
        id: 42,
        brief: 'beep',
        content: 'boop',
        timestamp: 42,
      })), {
        type: EDIT_COMMENT,
        id: 42,
        brief: 'boop',
        content: 'beep',
      });

      expect(nextState.last().toJS()).toEqual({
        id: 42,
        brief: 'boop',
        content: 'beep',
        timestamp: 42,
      });
    });

    it('shouldn\'t edit unexisting comments', () => {
      const state = List.of(new Comment({
        id: 42,
      }));

      const nextState = commentsListReducer(state, {
        type: EDIT_COMMENT,
        id: 24,
      });

      expect(nextState).toEqual(state);
    });
  });

  describe('DELETE_COMMENT', () => {
    it('should delete a comment', () => {
      const nextState = commentsListReducer(List.of(new Comment({
        id: 42,
      })), {
        type: DELETE_COMMENT,
        id: 42,
      });

      expect(nextState.size).toEqual(0);
    });

    it('shouldn\'t delete unexisting comments', () => {
      const state = List.of(new Comment({
        id: 42,
      }));

      const nextState = commentsListReducer(state, {
        type: DELETE_COMMENT,
        id: 24,
      });

      expect(nextState).toEqual(state);
    });
  });
});
