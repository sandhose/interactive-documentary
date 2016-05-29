import expect from 'expect';
import {
  addComment,
  editComment,
  deleteComment,
} from '../actions';
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from '../constants';

describe('CommentsList actions', () => {
  describe('Add comment action', () => {
    it('has a type of ADD_COMMENT', () => {
      expect(addComment({}).type).toEqual(ADD_COMMENT);
    });

    it('has the given properies', () => {
      expect(addComment({
        brief: 'beep',
        content: 'boop',
        timestamp: 42,
      })).toEqual({
        type: ADD_COMMENT,
        brief: 'beep',
        content: 'boop',
        timestamp: 42,
      });
    });
  });

  describe('Edit comment action', () => {
    it('has a type of EDIT_COMMENT', () => {
      expect(editComment(0, {}).type).toEqual(EDIT_COMMENT);
    });

    it('has the given properies', () => {
      expect(editComment(42, {
        brief: 'beep',
        content: 'boop',
        timestamp: 42,
      })).toEqual({
        type: EDIT_COMMENT,
        id: 42,
        brief: 'beep',
        content: 'boop',
        timestamp: 42,
      });
    });
  });

  describe('Delete comment action', () => {
    it('has a type of DELETE_COMMENT', () => {
      expect(deleteComment(0).type).toEqual(DELETE_COMMENT);
    });

    it('can have an id as argument', () => {
      expect(deleteComment(42).id).toEqual(42);
    });

    it('can have a comment as argument', () => {
      expect(deleteComment({ id: 42 }).id).toEqual(42);
    });
  });
});
