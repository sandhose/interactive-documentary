/*
 *
 * Timeline
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { createSelector } from 'reselect';
import { selectDuration, selectPlayed, selectLoaded } from '../Player/selectors';

import { updatePlayed } from '../Player/actions';

import styles from './styles.css';

const Timeline = ({ duration, played, loaded, onClick }) => {
  const clickHandler = event => {
    const el = event.currentTarget;
    const timestamp = (event.pageX - el.offsetLeft) / el.clientWidth * duration;
    onClick(timestamp);
  };

  return (
    <div className={styles.wrapper} onClick={clickHandler}>
      <div className={styles.playbar} style={{ width: `${played / duration * 100}%` }}></div>
      <div className={styles.loadbar} style={{ width: `${loaded / duration * 100}%` }}></div>
    </div>
  );
};

Timeline.propTypes = {
  duration: React.PropTypes.number.isRequired,
  played: React.PropTypes.number.isRequired,
  loaded: React.PropTypes.number.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onClick: timestamp => dispatch(updatePlayed(timestamp)),
  };
}

export default connect(createSelector(
  selectDuration(), selectPlayed(), selectLoaded(),
  (duration, played, loaded) => ({ duration, played, loaded })
), mapDispatchToProps)(Timeline);
