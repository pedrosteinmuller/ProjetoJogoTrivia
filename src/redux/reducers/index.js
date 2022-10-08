import { combineReducers } from 'redux';

import dataApi from './dataApi';
import player from './player';

const rootReducer = combineReducers({
  dataApi,
  player,
});

export default rootReducer;
