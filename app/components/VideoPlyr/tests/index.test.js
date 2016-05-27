import VideoPlyr from '../';
import { Mark } from '../../VideoTimeline';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<VideoPlyr />', () => {
  it('render <Mark /> children', () => {
    const children = <Mark />;
    const rendered = shallow(<VideoPlyr>{children}</VideoPlyr>);
    expect(rendered.contains(children)).to.equal(true);
  });
});
