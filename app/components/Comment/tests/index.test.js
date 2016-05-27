import Comment from '../';
import styles from '../styles.css';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<Comment />', () => {
  it('has a timestamp', () => {
    const rendered = shallow(<Comment content="" timestamp={12} onDelete={() => {}} />);
    expect(rendered.find(`.${styles.timestamp}`).text()).to.equal('00:12');
  });
});
