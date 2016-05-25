import {
  selectPlayer,
} from '../selectors';
import { fromJS } from 'immutable';
import expect from 'expect';

describe('selectPlayer', () => {
  const playerSelector = selectPlayer();
  it('should select the player state', () => {
    const playerState = fromJS({});
    const mockedState = fromJS({
      player: playerState,
    });
    expect(playerSelector(mockedState)).toEqual(playerState);
  });
});
