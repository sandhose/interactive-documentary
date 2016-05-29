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
  <article className={classNames(styles.comment, { [styles.open]: open })}>
    <time className={styles.timestamp}>{formatTime(timestamp)}</time>
    <main className={styles.content} dangerouslySetInnerHTML={{ __html: marked(content) }}></main>
    <button className={styles.delete} onClick={onDelete}>×</button>
  </article>
);

Comment.propTypes = {
  open: React.PropTypes.bool,
  content: React.PropTypes.string.isRequired,
  timestamp: React.PropTypes.number.isRequired,
  onDelete: React.PropTypes.func.isRequired,
};

export default Comment;
