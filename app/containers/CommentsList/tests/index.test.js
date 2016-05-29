import { CommentsList } from '../index';
import Comment from 'components/Comment';
import CommentForm from 'components/CommentForm';
import { Comment as CommentRecord } from '../reducer';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { stub } from 'sinon';
import { List } from 'immutable';

const noop = _ => _;
noop();

describe('<CommentsList />', () => {
  it('should have a CommentForm', () => {
    const handler = _ => _;
    const rendered = shallow(<CommentsList comments={new List()} add={handler} remove={noop} played={42} />);
    expect(rendered.contains(<CommentForm timestamp={42} onAdd={handler} />)).toEqual(true);
  });

  it('should have a list of <Comment />', () => {
    const comments = List.of(
      new CommentRecord({ id: 12, brief: 'boop', content: 'beep', timestamp: 3 }),
      new CommentRecord({ id: 5, brief: 'beep', content: 'boop', timestamp: 5 }),
    );
    const handler1 = _ => _;
    const handler2 = _ => _;
    const onRemove = stub();
    onRemove.withArgs(12).returns(handler1);
    onRemove.withArgs(5).returns(handler2);
    const rendered = shallow(<CommentsList comments={comments} open={comments.get(1)} add={noop} remove={onRemove} played={0} />);

    expect(rendered.containsAllMatchingElements([
      <Comment key={0} onDelete={handler1} open={false} id={12} brief="boop" content="beep" timestamp={3} />,
      <Comment key={1} onDelete={handler2} open id={5} brief="beep" content="boop" timestamp={5} />,
    ])).toEqual(true);
    expect(onRemove.calledTwice).toEqual(true);
  });
});
