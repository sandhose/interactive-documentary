/*
 *
 * Player
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';
import {
  selectState,
  selectId,
  selectPlayed,
  selectLoaded,
  selectDuration,
} from './selectors';

import Video from '../../components/Video';
import Timeline from '../Timeline';

import { playVideo, pauseVideo, updatePlayed, updateLoaded, updateDuration } from './actions';

import styles from './styles.css';

export const Player = ({ id, state, played, onPlay, onPause, onPlayedUpdate, onDurationUpdate, onLoadedUpdate }) => (
  <div className={styles.player}>
    <Video
      id={id}
      state={state}
      played={played}
      onPlay={onPlay}
      onPause={onPause}
      onPlayedUpdate={onPlayedUpdate}
      onDurationUpdate={onDurationUpdate}
      onLoadedUpdate={onLoadedUpdate}
    />
    <Timeline />
  </div>
);

Player.propTypes = {
  id: React.PropTypes.string.isRequired,
  state: React.PropTypes.oneOf(['PLAYING', 'PAUSED']),
  played: React.PropTypes.number.isRequired,
  onPlay: React.PropTypes.func.isRequired,
  onPause: React.PropTypes.func.isRequired,
  onPlayedUpdate: React.PropTypes.func.isRequired,
  onLoadedUpdate: React.PropTypes.func.isRequired,
  onDurationUpdate: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onPlay: () => dispatch(playVideo()),
    onPause: () => dispatch(pauseVideo()),
    onPlayedUpdate: timestamp => dispatch(updatePlayed(timestamp)),
    onLoadedUpdate: timestamp => dispatch(updateLoaded(timestamp)),
    onDurationUpdate: timestamp => dispatch(updateDuration(timestamp)),
  };
}

export default connect(createSelector(
  selectState(), selectId(), selectPlayed(), selectLoaded(), selectDuration(),
  (state, id, played, loaded, duration) => ({ state, id, played, loaded, duration })
), mapDispatchToProps)(Player);
