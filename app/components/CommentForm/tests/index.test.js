import CommentForm from '../';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<CommentForm />', () => {
  it('should have an empty state', () => {
    const rendered = shallow(<CommentForm timestamp={0} onAdd={() => {}} />);
    expect(rendered.state).to.equal({ brief: '', content: '' });
  });
});
