import { SEND_FETCH } from '../action/index';

const INITIAL_STATE = {

};

const fetch = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_FETCH:
    return action.payload
  default:
    return state;
  }
};

export default fetch;
