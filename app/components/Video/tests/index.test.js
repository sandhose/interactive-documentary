import Video from '../';

import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';

describe('<Video />', () => {
  it('renders children', () => {
    const children = <div>Bleh.</div>;
    const rendered = mount(<Video>{children}</Video>);
    expect(rendered.contains(children)).to.equal(true);
  });
});
