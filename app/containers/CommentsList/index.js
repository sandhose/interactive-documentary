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
  selectPlayed,
} from '../Player/selectors';
import {
  selectComments,
  selectOpen,
} from './selectors';
import {
  addComment,
  deleteComment,
  editComment,
} from './actions';

import Comment from '../../components/Comment';
import CommentForm from '../../components/CommentForm';
import { Comment as CommentRecord } from './reducer';

import styles from './styles.css';

const CommentsList = ({ comments, open, played, add, remove }) => (
  <div className={styles.list}>
    {comments.map((comment, id) => (<Comment key={id} onDelete={remove(comment.id)} open={comment === open} {...comment.toObject()} />))}
    <CommentForm timestamp={played} onAdd={add} />
  </div>
);

CommentsList.propTypes = {
  comments: React.PropTypes.instanceOf(List),
  open: React.PropTypes.instanceOf(CommentRecord),
  add: React.PropTypes.func.isRequired,
  remove: React.PropTypes.func.isRequired,
  played: React.PropTypes.number.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    add: comment => dispatch(addComment(comment)),
    edit: (id, comment) => dispatch(editComment(id, comment)),
    remove: id => () => dispatch(deleteComment(id)),
  };
}

export default connect(createSelector(
  selectComments(), selectOpen(), selectPlayed(),
  (comments, open, played) => ({ comments, open, played })
), mapDispatchToProps)(CommentsList);
