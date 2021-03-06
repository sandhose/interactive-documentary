/**
*
* VideoTimeline
*
*/

import React from 'react';
import classNames from 'classnames';

import styles from './styles.css';

const percent = (duration, time) => Math.round((time / duration) * 1000) / 10;

const VideoTimeline = ({ duration, loaded, played, children, onSeek }) => (
  <span className="plyr__progress">
    <input type="range" className="plyr__progress--seek" min="0" max="100" step="0.1" value={percent(duration, played)} onChange={e => onSeek(e.target.value / 100 * duration)} />
    <div className={styles.markers}>
      {children}
    </div>
    <progress className="plyr__progress--buffer" max="100" value={percent(duration, loaded)} />
    <progress className="plyr__progress--played" max="100" value={percent(duration, played)} />
  </span>
);

VideoTimeline.propTypes = {
  duration: React.PropTypes.number.isRequired,
  loaded: React.PropTypes.number.isRequired,
  played: React.PropTypes.number.isRequired,
  children: React.PropTypes.node,
  onSeek: React.PropTypes.func.isRequired,
};

export default VideoTimeline;

const Mark = ({ time, duration, children, open }) => (
  <div className={classNames(styles.mark, { [styles.open]: open })} style={{ left: `${time / duration * 100}%` }}>
    <div className={styles.bubble}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  </div>
);

Mark.propTypes = {
  time: React.PropTypes.number.isRequired,
  duration: React.PropTypes.number,
  open: React.PropTypes.bool,
  children: React.PropTypes.node,
};

export { Mark };
