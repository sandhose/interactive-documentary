/*
 *
 * Player
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { createSelector } from 'reselect';
import {
  selectPlaying,
  selectPlayed,
  selectLoaded,
  selectDuration,
} from './selectors';

import {
  selectComments,
  selectOpen,
} from '../CommentsList/selectors';
import { Comment } from '../CommentsList/reducer';

import VideoPlyr from '../../components/VideoPlyr';
import { Mark } from '../../components/VideoTimeline';

import { updatePlaying, updatePlayed, updateLoaded, updateDuration } from './actions';

import styles from './styles.css';

export const Player = ({ playing, played, loaded, duration, comments, openedComment, onPlayingUpdate, onPlayedUpdate, onDurationUpdate, onLoadedUpdate }) => (
  <div className={styles.player}>
    <VideoPlyr
      playing={playing}
      played={played}
      loaded={loaded}
      duration={duration}
      setPlaying={onPlayingUpdate}
      updatePlayed={onPlayedUpdate}
      updateDuration={onDurationUpdate}
      updateLoaded={onLoadedUpdate}
    >
      {comments.map((c, key) => (<Mark key={key} open={c === openedComment} time={c.timestamp}>{c.brief}</Mark>))}
    </VideoPlyr>
  </div>
);

Player.propTypes = {
  playing: React.PropTypes.bool.isRequired,
  played: React.PropTypes.number.isRequired,
  loaded: React.PropTypes.number.isRequired,
  duration: React.PropTypes.number.isRequired,
  comments: React.PropTypes.instanceOf(List),
  openedComment: React.PropTypes.instanceOf(Comment),
  onPlayingUpdate: React.PropTypes.func.isRequired,
  onPlayedUpdate: React.PropTypes.func.isRequired,
  onLoadedUpdate: React.PropTypes.func.isRequired,
  onDurationUpdate: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onPlayingUpdate: playing => dispatch(updatePlaying(playing)),
    onPlayedUpdate: timestamp => dispatch(updatePlayed(timestamp)),
    onLoadedUpdate: timestamp => dispatch(updateLoaded(timestamp)),
    onDurationUpdate: timestamp => dispatch(updateDuration(timestamp)),
  };
}

export default connect(createSelector(
  selectPlaying(), selectPlayed(), selectLoaded(), selectDuration(), selectComments(), selectOpen(),
  (playing, played, loaded, duration, comments, openedComment) => ({ playing, played, loaded, duration, comments, openedComment })
), mapDispatchToProps)(Player);
