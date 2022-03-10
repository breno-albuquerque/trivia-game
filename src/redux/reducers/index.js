import { combineReducers } from 'redux';
import token from './token';
// import wallet from './wallet';

const rootReducer = combineReducers({
  token,
  // wallet,
});

export default rootReducer;
