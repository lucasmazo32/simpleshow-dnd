import actions from '../actions/index';

const { action } = actions;
const { SET_START } = action;

export default function startReducer(state = false, action) {
  switch (action.type) {
    case SET_START:
      return true;
    default:
      return state;
  }
}
