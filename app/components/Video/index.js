/**
*
* Video
*
*/

import React from 'react';

class Video extends React.Component {
  constructor() {
    super();
    this.lastSent = {};
  }

  componentDidMount() {
    this.video = this.refs.video;

    this.on('play pause', this.update('playing', v => !v.paused));
    this.on('timeupdate seeking', this.update('played', v => v.currentTime));
    this.on('playing progress', this.update('loaded', v => (v.length > 0 ? v.buffered.end(0) : undefined)));
    this.on('durationchange loadedmetadata', this.update('duration', v => v.duration));
    this.on('ended', ({ target }) => {
      this.update('played', target.duration)();
      this.update('playing', false)();
    });
  }

  componentWillReceiveProps({ playing, played }) {
    if (this.video) {
      if (Math.abs(this.lastSent.played - played) > 1) this.video.currentTime = played;
      if (playing !== this.lastSent.playing) {
        if (playing) this.video.play();
        else this.video.pause();
      }
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
        this.lastSent[key] = val;
        if (handler) handler(val);
      }
    };
  }

  on(events, listener) {
    events.split(' ').forEach(event => this.video.addEventListener(event, listener));
  }

  render() {
    const { children, ...props } = this.props;
    delete props.playing;
    delete props.played;
    delete props.onPlayingUpdate;
    delete props.onPlayedUpdate;
    delete props.onDurationUpdate;
    delete props.onLoadedUpdate;

    return (
      <video ref="video" {...props}>
        {children}
      </video>
    );
  }
}

Video.propTypes = {
  children: React.PropTypes.node,
  playing: React.PropTypes.bool,
  played: React.PropTypes.number.isRequired,
  onDurationUpdate: React.PropTypes.func,
  onLoadedUpdate: React.PropTypes.func,
  onPlayedUpdate: React.PropTypes.func,
  onPlayingUpdate: React.PropTypes.func,
};

export default Video;
