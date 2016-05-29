import Comment from '../';
import styles from '../styles.css';

import expect from 'expect';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import React from 'react';
import marked from 'marked';

describe('<Comment />', () => {
  it('has a timestamp', () => {
    const rendered = shallow(<Comment content="" timestamp={12} onDelete={() => {}} />);
    expect(rendered.find('time').text()).toEqual('00:12');
    expect(rendered.find('time').hasClass(styles.timestamp)).toEqual(true);
  });

  it('has ths comment class', () => {
    const rendered = shallow(<Comment content="" timestamp={12} onDelete={() => {}} />);
    expect(rendered.find('article').hasClass(styles.comment)).toEqual(true);
  });

  it('has the open class when open', () => {
    const rendered = shallow(<Comment content="" timestamp={12} onDelete={() => {}} />);

    expect(rendered.find('article').hasClass(styles.open)).toEqual(false);
    rendered.setProps({ open: true });
    expect(rendered.find('article').hasClass(styles.open)).toEqual(true);
  });

  it('has the markdown content', () => {
    const md = `# Lorem ipsum dolor sit amet

This is the comment **content**.`;
    const rendered = mount(<Comment content={md} timestamp={12} onDelete={() => {}} />);

    expect(rendered.find('main').prop('dangerouslySetInnerHTML')).toEqual({ __html: marked(md) });
  });

  it('should trigger onDelete', () => {
    const handler = spy();
    const rendered = mount(<Comment content="" timestamp={12} onDelete={handler} />);

    expect(rendered.find('button').hasClass(styles.delete)).toEqual(true);
    rendered.find('button').simulate('click');
    expect(handler.calledOnce).toEqual(true);
  });
});
