import Video from '../';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';

describe('<Video />', () => {
  it('should render his childrens', () => {
    const children = <div>Bleh.</div>;
    const rendered = shallow(<Video played={0}>{children}</Video>);
    expect(rendered.contains(children)).toEqual(true);
  });

  it('should pass the additional props', () => {
    const rendered = shallow(<Video played={0} poster="bleh.png" />);
    expect(rendered.find('video').prop('poster')).toEqual('bleh.png');
  });

  describe('#componentWillReceiveProps', () => {
    describe('.playing', () => {
      it('should play if it was not playing', () => {
        const handler = spy();
        const rendered = shallow(<Video played={0} />);
        rendered.instance().refs = { video: { play: handler } };
        rendered.instance().lastSent.playing = false;
        rendered.setProps({ playing: true });
        expect(handler.calledOnce).toEqual(true);
      });

      it('should not play if it was already playing', () => {
        const handler = spy();
        const rendered = shallow(<Video played={0} />);
        rendered.instance().refs = { video: { play: handler } };
        rendered.instance().lastSent.playing = true;
        rendered.setProps({ playing: true });
        expect(handler.called).toEqual(false);
      });

      it('should pause if it was playing', () => {
        const handler = spy();
        const rendered = shallow(<Video played={0} />);
        rendered.instance().refs = { video: { pause: handler } };
        rendered.instance().lastSent.playing = true;
        rendered.setProps({ playing: false });
        expect(handler.calledOnce).toEqual(true);
      });

      it('should not pause if it was not playing', () => {
        const handler = spy();
        const rendered = shallow(<Video played={0} />);
        rendered.instance().refs = { video: { pause: handler } };
        rendered.instance().lastSent.playing = false;
        rendered.setProps({ playing: false });
        expect(handler.called).toEqual(false);
      });
    });

    describe('.played', () => {
      it('should seek if the diff between currentTime and played prop is greater than one', () => {
        const rendered = shallow(<Video played={0} />);
        rendered.instance().refs = { video: { currentTime: 0 } };
        rendered.instance().lastSent.played = 0;
        rendered.setProps({ played: 2 });
        expect(rendered.instance().refs.video.currentTime).toEqual(2);
      });

      it('should not seek if the diff between currentTime and played prop is less than one', () => {
        const rendered = shallow(<Video played={0} />);
        rendered.instance().refs = { video: { currentTime: 0 } };
        rendered.instance().lastSent.played = 0;
        rendered.setProps({ played: 0.5 });
        expect(rendered.instance().refs.video.currentTime).toEqual(0);
      });

      it('should seek if played wasn\'t updated before', () => {
        const rendered = shallow(<Video played={0} />);
        rendered.instance().refs = { video: { currentTime: 0 } };
        rendered.setProps({ played: 0.5 });
        expect(rendered.instance().refs.video.currentTime).toEqual(0.5);
      });
    });
  });

  describe('video events', () => {
    it('should listen on play event', () => {
      const handler = spy();
      const rendered = mount(<Video played={0} onPlayingUpdate={handler} />);
      rendered.ref('video').simulate('play', { target: { playing: true } });
      expect(handler.calledOnce).toEqual(true);
      expect(handler.firstCall.args).toEqual([true]);
    });

    it('should listen on pause event', () => {
      const handler = spy();
      const rendered = mount(<Video played={0} onPlayingUpdate={handler} />);
      rendered.ref('video').simulate('pause', { target: { playing: false } });
      expect(handler.calledOnce).toEqual(true);
      expect(handler.firstCall.args).toEqual([false]);
    });

    it('should listen on time update event', () => {
      const handler = spy();
      const rendered = mount(<Video played={0} onPlayedUpdate={handler} />);
      rendered.ref('video').simulate('timeupdate', { target: { currentTime: 12 } });
      expect(handler.calledOnce).toEqual(true);
      expect(handler.firstCall.args).toEqual([12]);
    });

    it('should listen on seeking event', () => {
      const handler = spy();
      const rendered = mount(<Video played={0} onPlayedUpdate={handler} />);
      rendered.ref('video').simulate('seeking', { target: { currentTime: 12 } });
      expect(handler.calledOnce).toEqual(true);
      expect(handler.firstCall.args).toEqual([12]);
    });

    it('should listen on loaded metadata event', () => {
      const handler = spy();
      const rendered = mount(<Video played={0} onDurationUpdate={handler} />);
      rendered.ref('video').simulate('loadedmetadata', { target: { duration: 12 } });
      expect(handler.calledOnce).toEqual(true);
      expect(handler.firstCall.args).toEqual([12]);
    });

    it('should listen on duration change event', () => {
      const handler = spy();
      const rendered = mount(<Video played={0} onDurationUpdate={handler} />);
      rendered.ref('video').simulate('durationchange', { target: { duration: 12 } });
      expect(handler.calledOnce).toEqual(true);
      expect(handler.firstCall.args).toEqual([12]);
    });

    it('should listen on ended event', () => {
      const handler1 = spy();
      const handler2 = spy();
      const rendered = mount(<Video played={0} onPlayedUpdate={handler1} onPlayingUpdate={handler2} />);
      rendered.ref('video').simulate('ended', { target: { duration: 42 } });
      expect(handler1.calledOnce).toEqual(true);
      expect(handler1.firstCall.args).toEqual([42]);
      expect(handler2.calledOnce).toEqual(true);
      expect(handler2.firstCall.args).toEqual([false]);
    });
  });
});
