import expect from 'expect';
import {
  addComment,

//  editComment,
//  deleteComment,
} from '../actions';
import {
  ADD_COMMENT,

//  DELETE_COMMENT,
//  EDIT_COMMENT,
} from '../constants';

describe('CommentsList actions', () => {
  describe('Add comment action', () => {
    it('has a type of ADD_COMMENT', () => {
      const expected = {
        type: ADD_COMMENT,
      };
      expect(addComment({})).toEqual(expected);
    });
  });
});
