/**
*
* Video
*
*/

import React from 'react';
import Youtube from 'react-youtube';

class Video extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    played: React.PropTypes.number.isRequired,
    state: React.PropTypes.oneOf(['PLAYING', 'PAUSED']),
    onPlay: React.PropTypes.func,
    onPause: React.PropTypes.func,
    onPlayedUpdate: React.PropTypes.func,
    onDurationUpdate: React.PropTypes.func,
    onLoadedUpdate: React.PropTypes.func,
  };

  static defaultProps = {
    onPlay: () => null,
    onPause: () => null,
    onPlayedUpdate: () => null,
    onDurationUpdate: () => null,
    onLoadedUpdate: () => null,
  };

  constructor(props) {
    super(props);
    this.player = null;
    this.lastPlayed = 0;
    this.lastLoaded = 0;
  }

  componentWillReceiveProps({ played, state }) {
    if (this.player) {
      this.updatePlayer({ played, state });
    }
  }

  onReady(event) {
    this.player = event.target;
    this.updateInterval = setInterval(::this.updatePlayed, 500);
    this.updatePlayed();
    this.updatePlayer(this.props);
    this.props.onDurationUpdate(this.player.getDuration());
  }

  onPlay(event) {
    this.props.onPlay(event);
  }

  onPause(event) {
    this.props.onPause(event);
  }

  getPlayed() {
    return this.player.getCurrentTime() || 0;
  }

  getLoaded() {
    return this.player.getVideoLoadedFraction() * this.player.getDuration() || 0;
  }

  updatePlayed() {
    const loaded = this.getLoaded();
    const played = this.getPlayed();

    if (Math.abs(loaded - this.lastLoaded) > 0.5) {
      this.props.onLoadedUpdate(loaded);
    }

    if (Math.abs(played !== this.lastPlayed) > 0.5) {
      this.props.onPlayedUpdate(played);
    }

    this.lastPlayed = played;
    this.lastLoaded = loaded;
  }

  updatePlayer({ played, state }) {
    if (state === 'PLAYING' && this.player.getPlayerState() !== 1) this.player.playVideo();
    else if (state === 'PAUSED' && this.player.getPlayerState() === 1) this.player.pauseVideo();

    if (this.player.getPlayerState() < 3 && Math.abs(this.lastPlayed - played) > 2) {
      this.player.seekTo(played);
      this.updatePlayed();
    }
  }

  render() {
    const opts = {
      playerVars: {
        controls: 0,
      },
    };

    return (
      <Youtube
        videoId={this.props.id}
        opts={opts}
        onPlay={::this.onPlay}
        onPause={::this.onPause}
        onReady={::this.onReady}
      />
    );
  }
}

export default Video;
