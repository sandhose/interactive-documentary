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

  componentWillReceiveProps({ playing, played }) {
    if (this.refs.video) {
      if (this.lastSent.played === undefined
      || Math.abs(this.lastSent.played - played) > 1) this.refs.video.currentTime = played;

      if (playing !== this.lastSent.playing) {
        if (playing) this.refs.video.play();
        else this.refs.video.pause();
      }
    }
  }

  render() {
    const {
      children,
      ...props,
    } = this.props;

    ['onPlayingUpdate', 'onPlayedUpdate', 'onDurationUpdate', 'onLoadedUpdate', 'playing', 'played'].forEach(p => delete props[p]);

    const bindUpdate = (key, boundValue) => value => {
      let effectiveValue;
      if (typeof boundValue === 'function') effectiveValue = boundValue(value);
      else if (boundValue !== undefined) effectiveValue = boundValue;
      else effectiveValue = value;
      if (this.lastSent[key] === undefined || this.lastSent[key] !== effectiveValue) {
        const handler = this.props[`on${key.charAt(0).toUpperCase()}${key.slice(1)}Update`];
        this.lastSent[key] = effectiveValue;
        if (handler) handler(effectiveValue);
      }
    };

    Object.assign(props, {
      onPlay: bindUpdate('playing', true),
      onPause: bindUpdate('playing', false),
      onTimeUpdate: bindUpdate('played', e => e.target.currentTime),
      onSeeking: bindUpdate('played', e => e.target.currentTime),
      onDurationChange: bindUpdate('duration', e => e.target.duration),
      onLoadedMetadata: bindUpdate('duration', e => e.target.duration),
      onEnded: e => {
        bindUpdate('playing')(false);
        bindUpdate('played')(e.target.duration);
      },
    });

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
