/*
 *
 * CommentsList actions
 *
 */

import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from './constants';

export function addComment({ brief, content, timestamp }) {
  return {
    type: ADD_COMMENT,
    brief,
    content,
    timestamp,
  };
}

export function deleteComment({ id }) {
  return {
    type: DELETE_COMMENT,
    id,
  };
}

export function editComment(id, { brief, content, timestamp }) {
  const obj = {};
  if (brief !== undefined) obj.brief = brief;
  if (content !== undefined) obj.content = content;
  if (timestamp !== undefined) obj.timestamp = timestamp;
  return {
    type: EDIT_COMMENT,
    id,
    ...obj,
  };
}
