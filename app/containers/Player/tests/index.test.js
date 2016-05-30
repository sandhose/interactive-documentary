import { Player } from '../index';
import VideoPlyr from 'components/VideoPlyr';
import { Mark } from 'components/VideoTimeline';
import { Comment as CommentRecord } from 'containers/CommentsList/reducer';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import { List } from 'immutable';

const noop = _ => _;
noop();

describe('<Player />', () => {
  it('should render one <VideoPlyr /> component', () => {
    const handler1 = _ => _;
    const handler2 = _ => _;
    const handler3 = _ => _;
    const handler4 = _ => _;
    const rendered = shallow(<Player
      playing={false}
      played={0}
      loaded={12}
      duration={42}
      onPlayingUpdate={handler1}
      onPlayedUpdate={handler2}
      onDurationUpdate={handler3}
      onLoadedUpdate={handler4}
      comments={new List()}
    />);
    expect(rendered.contains(<VideoPlyr
      playing={false}
      played={0}
      loaded={12}
      duration={42}
      setPlaying={handler1}
      updatePlayed={handler2}
      updateDuration={handler3}
      updateLoaded={handler4}
    />)).toEqual(true);
  });

  const defaultProps = { playing: false, played: 0, loaded: 0, duration: 0, onPlayingUpdate: noop, onPlayedUpdate: noop, onDurationUpdate: noop, onLoadedUpdate: noop };

  it('should have the comments rendered as <Mark />', () => {
    const rendered = shallow(<Player
      {...defaultProps}
      comments={List.of(
        new CommentRecord({ brief: 'beep', timestamp: 12 }),
        new CommentRecord({ brief: 'boop', timestamp: 42 }),
      )}
    />);

    expect(rendered.contains(<Mark key={0} open={false} time={12}>beep</Mark>)).toEqual(true);
    expect(rendered.contains(<Mark key={1} open={false} time={42}>boop</Mark>)).toEqual(true);
  });

  it('should have a open prop on the openedComments <Mark />', () => {
    const opened = new CommentRecord({ brief: 'beep', timestamp: 12 });
    const rendered = shallow(<Player
      {...defaultProps}
      openedComment={opened}
      comments={List.of(
        opened,
        new CommentRecord({ brief: 'boop', timestamp: 42 }),
      )}
    />);

    expect(rendered.contains(<Mark key={0} open time={12}>beep</Mark>)).toEqual(true);
    expect(rendered.contains(<Mark key={1} open={false} time={42}>boop</Mark>)).toEqual(true);
  });
});
