import CommentForm from '../';
import styles from '../styles.css';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import marked from 'marked';

describe('<CommentForm />', () => {
  it('should have an empty state', () => {
    const rendered = shallow(<CommentForm timestamp={0} onAdd={() => {}} />);
    expect(rendered.state()).toEqual({ brief: '', content: '' });
  });

  it('should fill the state with the inputs', () => {
    const rendered = shallow(<CommentForm timestamp={0} onAdd={() => {}} />);
    const brief = rendered.find('input');
    const content = rendered.find('textarea');

    brief.simulate('change', { target: { value: 'beep' } });
    content.simulate('change', { target: { value: 'boop' } });

    expect(rendered.state()).toEqual({ brief: 'beep', content: 'boop' });
  });

  it('should update the preview', () => {
    const rendered = shallow(<CommentForm timestamp={0} onAdd={() => {}} />);
    rendered.setState({ content: 'Bleh.' });
    expect(rendered.find(`.${styles.preview}`).prop('dangerouslySetInnerHTML')).toEqual({ __html: marked('Bleh.') });
  });

  it('should update the inputs with the state', () => {
    const rendered = shallow(<CommentForm timestamp={0} onAdd={() => {}} />);
    rendered.setState({ content: 'beep', brief: 'boop' });

    expect(rendered.find('input').prop('value')).toEqual('boop');
    expect(rendered.find('textarea').prop('value')).toEqual('beep');
  });

  it('should have a form with the .form class', () => {
    const rendered = shallow(<CommentForm timestamp={0} onAdd={() => {}} />);

    expect(rendered.find('form').hasClass(styles.form)).toEqual(true);
  });

  it('should trigger onAdd on form submit', () => {
    const handler = spy();
    const preventDefault = spy();
    const rendered = shallow(<CommentForm timestamp={42} onAdd={handler} />);

    rendered.setState({ brief: 'beep', content: 'boop' });
    rendered.find('form').simulate('submit', { preventDefault });

    expect(preventDefault.calledOnce).toEqual(true);
    expect(handler.calledOnce).toEqual(true);
    expect(handler.args[0][0]).toEqual({ brief: 'beep', content: 'boop', timestamp: 42 });
  });
});
