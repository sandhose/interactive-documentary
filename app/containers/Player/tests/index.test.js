import { Player } from '../index';
import Video from '../../../components/Video';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Player />', () => {
  it('should render one <Video /> component', () => {
    const wrapper = shallow(<Player />);
    expect(wrapper.find(Video).length).toEqual(1);
  });
});
