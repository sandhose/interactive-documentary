import VideoTimeline, { Mark } from '../';
import styles from '../styles.css';

import expect from 'expect';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import React from 'react';

describe('<VideoTimeline />', () => {
  it('should render a range', () => {
    const handler = spy();
    const rendered = shallow(<VideoTimeline played={1} loaded={2} duration={3} onSeek={handler} />);
    const range = rendered.find('input[type="range"]');
    expect(range.length).toEqual(1);
    expect(range.hasClass('plyr__progress--seek')).toEqual(true);
    range.simulate('change', { target: { value: 50 } });
    expect(handler.calledOnce).toEqual(true);
    expect(handler.firstCall.args).toEqual([1.5]);
  });

  it('should render a loaded progress', () => {
    const rendered = shallow(<VideoTimeline played={1} loaded={2} duration={4} onSeek={() => {}} />);
    expect(rendered.find('.plyr__progress--buffer').prop('value')).toEqual(50);
  });

  it('should render a played progress', () => {
    const rendered = shallow(<VideoTimeline played={1} loaded={2} duration={4} onSeek={() => {}} />);
    expect(rendered.find('.plyr__progress--played').prop('value')).toEqual(25);
  });

  it('should pass his children', () => {
    const children = <div>Bleh.</div>;
    const rendered = shallow(<VideoTimeline played={1} loaded={2} duration={4} onSeek={() => {}}>{children}</VideoTimeline>);
    expect(rendered.find(`.${styles.markers}`).contains(children)).toEqual(true);
  });
});

describe('<Mark />', () => {
  it('should pass his children', () => {
    const children = <div>Bleh.</div>;
    const rendered = shallow(<Mark time={1} duration={2}>{children}</Mark>);
    expect(rendered.find(`.${styles.inner}`).contains(children)).toEqual(true);
  });

  it('should have the .open class when open', () => {
    const rendered = shallow(<Mark time={1} duration={2} />);
    expect(rendered.hasClass(styles.open)).toEqual(false);
    rendered.setProps({ open: true });
    expect(rendered.hasClass(styles.open)).toEqual(true);
  });
});
