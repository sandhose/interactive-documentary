/**
*
* VideoPlyr
*
*/

import React from 'react';
import classNames from 'classnames';
import Button from '../Button';
import VideoTimeline, { Mark } from '../VideoTimeline';

import styles from './styles.css';
import 'style-loader!plyr/dist/plyr.css';
import PlyrSvg from '!!babel!svg-react!plyr/dist/plyr.svg';

import poster from '../../video/poster.png';
import videoMP4 from 'url-loader!../../video/big-buck-bunny-240p.mp4';

const pad = number => (number > 9 ? '' : '0') + Math.floor(number);
const formatTime = time => `${pad(time / 60)}:${pad(time % 60)}`;

class VideoPlyr extends React.Component {
  componentDidMount() {
    this.video = this.refs.video;
    this.on('play pause', () => console.log('Playing', !this.video.paused));
    this.on('timeupdate seeking', () => console.log('Time', this.video.currentTime));
    this.on('durationchange loadedmetadata', () => console.log('Duration', this.video.duration));
  }

  on(events, listener) {
    events.split(' ').forEach(event => this.video.addEventListener(event, listener));
  }

  render() {
    const { playing, loaded, played, duration } = this.props;
    const children = React.Children.toArray(this.props.children);
    return (
      <div
        className={classNames(
          'plyr', 'plyr--video', {
            'plyr--playing': playing,
            'plyr--stopped': !playing,
          }
        )}
      >
        <PlyrSvg className={styles.hidden} />
        <div className="plyr__video-wrapper">
          <video ref="video" poster={poster}>
            <source src={videoMP4} type="video/mp4" />
          </video>
        </div>
        <Button className="plyr__play-large" name="Play" icon="#plyr-play" />
        <div className="plyr__controls">
          <Button data-plyr="play" tooltip name="Play" icon="#plyr-play" />
          <Button data-plyr="pause" tooltip name="Pause" icon="#plyr-pause" />
          <VideoTimeline onSeek={() => {}} duration={duration} loaded={loaded} played={played}>
            {children.filter(c => c.type === Mark).map(c => React.cloneElement(c, { duration }))}
          </VideoTimeline>
          <span className="plyr__time">
            <span className="plyr__sr-only">Current time</span>
            <span className="plyr__time--current">{formatTime(duration)}</span>
          </span>
        </div>
      </div>
    );
  }
}

VideoPlyr.propTypes = {
  playing: React.PropTypes.bool,
  loaded: React.PropTypes.number,
  played: React.PropTypes.number,
  duration: React.PropTypes.number,
  children: React.PropTypes.node,
};

export default VideoPlyr;
