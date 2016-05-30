import VideoPlyr from '../';
import Video from 'components/Video';
import VideoTimeline, { Mark } from 'components/VideoTimeline';

import expect from 'expect';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import React from 'react';

describe('<VideoPlyr />', () => {
  it('should have plyr and plyr--video classes', () => {
    const rendered = shallow(<VideoPlyr />);
    expect(rendered.find('.plyr').hasClass('plyr--video')).toEqual(true);
  });

  it('should add plyr--playing class when playing', () => {
    const rendered = shallow(<VideoPlyr />);
    expect(rendered.find('.plyr').hasClass('plyr--playing')).toEqual(false);
    rendered.setProps({ playing: true });
    expect(rendered.find('.plyr').hasClass('plyr--playing')).toEqual(true);
  });

  it('should add plyr--stopped class when playing', () => {
    const rendered = shallow(<VideoPlyr />);
    expect(rendered.find('.plyr').hasClass('plyr--stopped')).toEqual(true);
    rendered.setProps({ playing: true });
    expect(rendered.find('.plyr').hasClass('plyr--stopped')).toEqual(false);
  });

  it('should render a <Video /> element', () => {
    const handler1 = _ => _;
    const handler2 = _ => _;
    const handler3 = _ => _;
    const handler4 = _ => _;
    const rendered = shallow(<VideoPlyr updatePlayed={handler1} setPlaying={handler2} updateDuration={handler3} updateLoaded={handler4} playing played={2} />);
    const timeline = rendered.find(Video);
    expect(timeline.prop('onPlayedUpdate')).toEqual(handler1);
    expect(timeline.prop('onPlayingUpdate')).toEqual(handler2);
    expect(timeline.prop('onDurationUpdate')).toEqual(handler3);
    expect(timeline.prop('onLoadedUpdate')).toEqual(handler4);
    expect(timeline.prop('played')).toEqual(2);
    expect(timeline.prop('playing')).toEqual(true);
  });

  it('should have a large play button', () => {
    const handler = spy();
    const rendered = shallow(<VideoPlyr setPlaying={handler} />);
    rendered.find('.plyr__play-large').simulate('click');
    expect(handler.calledOnce).toEqual(true);
    expect(handler.firstCall.args).toEqual([true]);
  });

  it('should have a play button', () => {
    const handler = spy();
    const rendered = shallow(<VideoPlyr setPlaying={handler} />);
    rendered.find('[data-plyr="play"]').simulate('click');
    expect(handler.calledOnce).toEqual(true);
    expect(handler.firstCall.args).toEqual([true]);
  });

  it('should have a pause button', () => {
    const handler = spy();
    const rendered = shallow(<VideoPlyr setPlaying={handler} />);
    rendered.find('[data-plyr="pause"]').simulate('click');
    expect(handler.calledOnce).toEqual(true);
    expect(handler.firstCall.args).toEqual([false]);
  });

  it('should have a <VideoTimeline />', () => {
    const handler = _ => _;
    const rendered = shallow(<VideoPlyr updatePlayed={handler} duration={4} loaded={3} played={2} />);
    const timeline = rendered.find(VideoTimeline);
    expect(timeline.prop('onSeek')).toEqual(handler);
    expect(timeline.prop('duration')).toEqual(4);
    expect(timeline.prop('loaded')).toEqual(3);
    expect(timeline.prop('played')).toEqual(2);
  });

  it('should render <Mark /> children in <VideoTimeline /> with duration prop', () => {
    const children = <Mark time={12} />;
    const rendered = shallow(<VideoPlyr duration={42}>{children}</VideoPlyr>);
    expect(rendered.find(VideoTimeline).find(Mark).props()).toEqual({ time: 12, duration: 42 });
  });

  it('should show the current time', () => {
    const rendered = shallow(<VideoPlyr played={42} />);
    expect(rendered.find('.plyr__time--current').text()).toEqual('00:42');
  });
});
