import { SEND_PLAYER } from '../action/index';

const INITIAL_STATE = {
  userName: '',
  userEmail: '',
  score: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_PLAYER:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default playerReducer;
