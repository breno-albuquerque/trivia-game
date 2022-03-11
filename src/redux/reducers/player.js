import { SEND_PLAYER, SEND_SCORE } from '../action/index';

const INITIAL_STATE = {
  userName: '',
  userEmail: '',
  score: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_SCORE:
    return { score: state.score + action.payload };
  case SEND_PLAYER:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default playerReducer;
