import { SEND_PLAYER, SEND_SCORE, SEND_FINISH } from '../action/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  finish: false,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_FINISH:
    return {
      ...state, finish: action.payload,
    };
  case SEND_PLAYER:
    return {
      ...state,
      name: action.payload.userName,
      gravatarEmail: action.payload.userEmail,
    };
  case SEND_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default playerReducer;
