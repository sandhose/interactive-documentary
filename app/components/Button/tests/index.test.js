import Button from '../index';

import { spy } from 'sinon';
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Button />', () => {
  it('should pass onClick', () => {
    const handler = spy();
    const rendered = shallow(<Button icon="" name="" onClick={handler} />);
    rendered.find('button').simulate('click');
    expect(handler.calledOnce).toEqual(true);
  });

  it('should have screen-reader label', () => {
    const rendered = shallow(<Button icon="" name="boop" />);
    expect(rendered.find('span').hasClass('plyr__sr-only')).toEqual(true);
    expect(rendered.find('span').hasClass('plyr__tooltip')).toEqual(false);
    expect(rendered.find('span').text()).toEqual('boop');
  });

  it('should render tooltip', () => {
    const rendered = shallow(<Button icon="" name="beep" tooltip />);
    expect(rendered.find('span').hasClass('plyr__tooltip')).toEqual(true);
    expect(rendered.find('span').hasClass('plyr__sr-only')).toEqual(false);
    expect(rendered.find('span').text()).toEqual('beep');
  });

  it('should have an icon', () => {
    const rendered = shallow(<Button icon="beep" name="" />);
    expect(rendered.find('svg').length).toEqual(1);
    expect(rendered.find('svg use').prop('xlinkHref')).toEqual('beep');
  });
});
