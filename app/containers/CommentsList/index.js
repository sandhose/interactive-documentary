/*
 *
 * CommentsList
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { createSelector } from 'reselect';
import {
  selectComments,
} from './selectors';
import {
  addComment,
  deleteComment,
  editComment,
} from './actions';

import styles from './styles.css';

const CommentsList = ({ comments }) => (
  <div className={styles.blbl}>
    {comments.map((comment, id) => (<div key={id}>{comment.content}</div>))}
  </div>
);

CommentsList.propTypes = {
  comments: React.PropTypes.instanceOf(List),
};

function mapDispatchToProps(dispatch) {
  return {
    add: comment => dispatch(addComment(comment)),
    edit: (id, comment) => dispatch(editComment(id, comment)),
    delete: id => dispatch(deleteComment(id)),
  };
}

export default connect(createSelector(
  selectComments(), (comments) => ({ comments })
), mapDispatchToProps)(CommentsList);
