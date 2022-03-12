import { SEND_PLAYER, SEND_ASSERTION, SEND_SCORE } from '../action/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_ASSERTION:
    return {
      ...state, assertions: state.assertions + action.payload,
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
    };
  default:
    return state;
  }
};

export default playerReducer;
