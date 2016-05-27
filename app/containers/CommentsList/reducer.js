/*
 *
 * CommentsList reducer
 *
 */

import { Record, List } from 'immutable';
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from './constants';

const Comment = new Record({ id: -1, brief: '', timestamp: 0, content: '' }, 'Comment');

const initialState = List.of(new Comment({
  id: 0,
  brief: 'Lorem ipsum dolor sit amet',
  timestamp: 12,
  content: `# Lorem ipsum dolor sit amet

Consectetur **adipiscing** elit. Aenean sit amet posuere nunc, non cursus mi. Nam ante massa, tristique in urna eu, _blandit_ mollis libero. Integer rutrum nibh eu imperdiet aliquam. Sed in lacus nisi. Aenean sit amet orci vehicula nunc molestie consequat non eu ante.

Aenean nec leo pulvinar, viverra turpis sed, tempus lectus. Nulla facilisi.

![Image](/d213dfdded2064061f0f057233a8886b.png)`,
}), new Comment({
  id: 1,
  brief: 'Lorem ipsum dolor sit amet',
  timestamp: 21,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet posuere nunc, non cursus mi. Nam ante massa, tristique in urna eu, blandit mollis libero. Integer rutrum nibh eu imperdiet aliquam. Sed in lacus nisi. Aenean sit amet orci vehicula nunc molestie consequat non eu ante. Aenean nec leo pulvinar, viverra turpis sed, tempus lectus. Nulla facilisi.',
}), new Comment({
  id: 2,
  brief: 'Lorem ipsum dolor sit amet',
  timestamp: 15,
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet posuere nunc, non cursus mi. Nam ante massa, tristique in urna eu, blandit mollis libero. Integer rutrum nibh eu imperdiet aliquam. Sed in lacus nisi. Aenean sit amet orci vehicula nunc molestie consequat non eu ante. Aenean nec leo pulvinar, viverra turpis sed, tempus lectus. Nulla facilisi.',
}));

const byId = id => comment => comment.id === id;

function commentsListReducer(state = initialState, { type, ...attrs }) {
  switch (type) {
    case ADD_COMMENT:
      return state.push(new Comment({
        id: state.reduce((a, b) => Math.max(a.id, b.id), -1) + 1,
        ...attrs,
      }));
    case DELETE_COMMENT:
      return state.delete(state.findIndex(byId(attrs.id)));
    case EDIT_COMMENT:
      return state.update(
        state.findIndex(byId(attrs.id)),
        comment => comment.merge(attrs),
      );
    default:
      return state;
  }
}

export default commentsListReducer;
export { Comment };
