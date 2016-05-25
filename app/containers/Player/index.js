/*
 *
 * Player
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';
import {
  selectPlaying,
  selectPlayed,
  selectLoaded,
  selectDuration,
} from './selectors';

import VideoPlyr from '../../components/VideoPlyr';

import { updatePlaying, updatePlayed, updateLoaded, updateDuration } from './actions';

import styles from './styles.css';

export const Player = ({ playing, played, loaded, duration, onPlayingUpdate, onPlayedUpdate, onDurationUpdate, onLoadedUpdate }) => (
  <div className={styles.player}>
    <VideoPlyr
      playing={playing}
      played={played}
      loaded={loaded}
      duration={duration}
      onPlayingUpdate={onPlayingUpdate}
      onPlayedUpdate={onPlayedUpdate}
      onDurationUpdate={onDurationUpdate}
      onLoadedUpdate={onLoadedUpdate}
    />
  </div>
);

Player.propTypes = {
  playing: React.PropTypes.bool.isRequired,
  played: React.PropTypes.number.isRequired,
  loaded: React.PropTypes.number.isRequired,
  duration: React.PropTypes.number.isRequired,
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
  selectPlaying(), selectPlayed(), selectLoaded(), selectDuration(),
  (playing, played, loaded, duration) => ({ playing, played, loaded, duration })
), mapDispatchToProps)(Player);
