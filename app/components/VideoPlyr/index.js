/**
*
* VideoPlyr
*
*/

import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import Video from '../Video';
import VideoTimeline, { Mark } from '../VideoTimeline';

import styles from './styles.css';
import 'style-loader!plyr/dist/plyr.css';
import PlyrSvg from '!!babel!svg-react!plyr/dist/plyr.svg';

import poster from '../../video/poster.png';
import videoMP4 from 'url-loader!../../video/big-buck-bunny-240p.mp4';

const pad = number => (number >= 10 ? '' : '0') + Math.floor(number);
const formatTime = time => `${pad(time / 60)}:${pad(time % 60)}`;

const VideoPlyr = ({ playing, loaded, played, duration, children, setPlaying, updatePlayed, updateDuration, updateLoaded }) => (
  <div
    className={classNames('plyr', 'plyr--video', playing ? 'plyr--playing' : 'plyr--stopped')}
  >
    <PlyrSvg className={styles.hidden} />
    <div className="plyr__video-wrapper">
      <Video poster={poster} played={played} playing={playing} onPlayingUpdate={setPlaying} onPlayedUpdate={updatePlayed} onDurationUpdate={updateDuration} onLoadedUpdate={updateLoaded}>
        <source src={videoMP4} type="video/mp4" />
      </Video>
    </div>
    <Button className="plyr__play-large" onClick={() => setPlaying(true)} name="Play" icon="#plyr-play" />
    <div className="plyr__controls">
      <Button data-plyr="play" onClick={() => setPlaying(true)} tooltip name="Play" icon="#plyr-play" />
      <Button data-plyr="pause" onClick={() => setPlaying(false)} tooltip name="Pause" icon="#plyr-pause" />
      <VideoTimeline onSeek={updatePlayed} duration={duration} loaded={loaded} played={played}>
        {React.Children.toArray(children).filter(c => c.type === Mark).map(c => React.cloneElement(c, { duration }))}
      </VideoTimeline>
      <span className="plyr__time">
        <span className="plyr__sr-only">Current time</span>
        <span className="plyr__time--current">{formatTime(played)}</span>
      </span>
    </div>
  </div>
);

VideoPlyr.propTypes = {
  playing: React.PropTypes.bool,
  loaded: React.PropTypes.number,
  played: React.PropTypes.number,
  duration: React.PropTypes.number,
  children: React.PropTypes.node,
  setPlaying: React.PropTypes.func,
  updatePlayed: React.PropTypes.func,
  updateDuration: React.PropTypes.func,
  updateLoaded: React.PropTypes.func,
};

VideoPlyr.defaultProps = {
  playing: false,
  loaded: 0,
  played: 0,
  duration: 0,
  setPlaying: _ => _,
  updatePlayed: _ => _,
  updateDuration: _ => _,
  updateLoaded: _ => _,
};

export default VideoPlyr;
