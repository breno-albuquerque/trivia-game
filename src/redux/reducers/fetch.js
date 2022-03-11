import { SEND_FETCH } from '../action/index';

const INITIAL_STATE = {
  response_code: 0,
  results: [],
};

const fetch = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_FETCH:
    return action.payload;
  default:
    return state;
  }
};

export default fetch;
