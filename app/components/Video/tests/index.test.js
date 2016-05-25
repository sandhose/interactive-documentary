import Video from '../';
import Youtube from 'react-youtube';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Video />', () => {
  it('renders one <Youtube /> component', () => {
    const wrapper = shallow(<Video />);
    expect(wrapper.find(Youtube).length).toEqual(1);
  });
});
