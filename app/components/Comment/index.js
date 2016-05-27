/**
*
* Comment
*
*/

import React from 'react';
import classNames from 'classnames';
import marked from 'marked';

import styles from './styles.css';

const pad = number => (number >= 10 ? '' : '0') + Math.floor(number);
const formatTime = time => `${pad(time / 60)}:${pad(time % 60)}`;

const Comment = ({ content, timestamp, open, onDelete }) => (
  <div className={classNames(styles.comment, { [styles.open]: open })}>
    <div className={styles.timestamp}>{formatTime(timestamp)}</div>
    <div className={styles.content} dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
    <button className={styles.delete} onClick={onDelete}>×</button>
  </div>
);

Comment.propTypes = {
  open: React.PropTypes.bool,
  content: React.PropTypes.string.isRequired,
  timestamp: React.PropTypes.number.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

export default Comment;
