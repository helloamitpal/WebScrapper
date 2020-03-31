import { combineReducers } from 'redux';

import scrapperReducer from '../modules/Scrapper/scrapperReducer';

// this is the root reducer to combine module wise reducers
const rootReducer = combineReducers({
  scrapper: scrapperReducer
});

export default rootReducer;
