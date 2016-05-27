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
    expect(handler.calledOnce).to.equal(true);
  });

  it('should render tooltip', () => {
    const rendered = shallow(<Button icon="" name="beep" tooltip />);
    expect(rendered.find('span').hasClass('plyr__tooltip')).to.equal('true');
    expect(rendered.find('span').text()).to.equal('beep');
  });
});
