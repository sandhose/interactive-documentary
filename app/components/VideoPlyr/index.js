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
  constructor() {
    super();
    this.lastSent = {};
  }

  componentDidMount() {
    this.video = this.refs.video;

    this.on('play pause', this.update('playing', v => v.playing));
    this.on('timeupdate seeking', this.update('played', v => v.currentTime));
    this.on('playing progress', this.update('loaded', v => (v.length > 0 ? v.buffered.end(0) : undefined)));
    this.on('durationchange loadedmetadata', this.update('duration', v => v.duration));
  }

  componentWillReceiveProps({ playing, played }) {
    if (this.video) {
      if (Math.abs(this.video.currentTime - played) > 0.5) this.video.currentTime = played;
      if (playing) this.video.play();
      else this.video.pause();
    }
  }

  update(key, map) {
    return (givenVal) => {
      let val;
      if (map === undefined && givenVal !== undefined) val = givenVal;
      else if (typeof map === 'function') val = map(this.video);
      else val = map;

      if (val !== undefined && val !== this.lastSent[key]) {
        const handler = this.props[`on${key.charAt(0).toUpperCase()}${key.slice(1)}Update`];
        if (handler) handler(val);
        this.lastSent[key] = val;
      }
    };
  }

  on(events, listener) {
    events.split(' ').forEach(event => this.video.addEventListener(event, listener));
  }

  render() {
    const { playing, loaded, played, duration } = this.props;
    const children = React.Children.toArray(this.props.children);
    const play = this.update('playing', true);
    const pause = this.update('playing', false);
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
        <Button className="plyr__play-large" onClick={play} name="Play" icon="#plyr-play" />
        <div className="plyr__controls">
          <Button data-plyr="play" onClick={play} tooltip name="Play" icon="#plyr-play" />
          <Button data-plyr="pause" onClick={pause} tooltip name="Pause" icon="#plyr-pause" />
          <VideoTimeline onSeek={this.update('played')} duration={duration} loaded={loaded} played={played}>
            {children.filter(c => c.type === Mark).map(c => React.cloneElement(c, { duration }))}
          </VideoTimeline>
          <span className="plyr__time">
            <span className="plyr__sr-only">Current time</span>
            <span className="plyr__time--current">{formatTime(played)}</span>
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
  onDurationUpdate: React.PropTypes.func,
  onLoadedUpdate: React.PropTypes.func,
  onPlayedUpdate: React.PropTypes.func,
  onPlayingUpdate: React.PropTypes.func,
};

VideoPlyr.defaultProps = {
  onDurationUpdate: _ => console.log(_),
  onLoadedUpdate: _ => console.log(_),
  onPlayedUpdate: _ => console.log(_),
  onPlayingUpdate: _ => console.log(_),
};

export default VideoPlyr;
