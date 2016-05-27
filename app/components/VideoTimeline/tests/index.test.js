import VideoTimeline from '../';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<VideoTimeline />', () => {
  it('render a range', () => {
    const rendered = shallow(<VideoTimeline />);
    expect(rendered.find('input[type=range]').hasClass('plyr__progress--seek')).to.equal('true');
  });
});
