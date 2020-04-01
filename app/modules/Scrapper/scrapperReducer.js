import { handle } from 'redux-pack';

import * as actionTypes from './scrapperActionTypes';
import translate from '../../locale';

const initialState = {
  links: [],
  savedLinks: [],
  topLinks: [],
  errors: '',
  loading: false
};

const articleReducer = (state = initialState, action = '') => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_LINKS:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          loading: true
        }),
        success: (prevState) => ({
          ...prevState,
          links: payload ? [...payload] : []
        }),
        failure: (prevState) => ({
          ...prevState,
          errors: translate('common.tryAgainSometime')
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });

    case actionTypes.REMOVE_LINK:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          loading: true
        }),
        success: (prevState) => ({
          ...prevState,
          savedLinks: payload ? [...payload] : []
        }),
        failure: (prevState) => ({
          ...prevState,
          errors: translate('common.failed')
        }),
        finish: (prevState) => ({
          ...prevState,
          loading: false
        })
      });

    case actionTypes.FETCH_TOP_SAVED_LINKS: {
      const newState = { ...state };
      const arr = [...newState.savedLinks];
      const { count } = payload;

      newState.topLinks = arr.length ? arr.slice(Math.max(arr.length - count, 0)) : [];

      return newState;
    }

    case actionTypes.FETCH_SAVED_LINKS:
    case actionTypes.SAVE_LINK:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          errors: '',
          loading: true
        }),
        success: (prevState) => ({
          ...prevState,
          savedLinks: [...payload]
        }),
        failure: (prevState) => ({
          ...prevState,
          errors: translate('common.failed')
        }),
        finish: prevState => ({
          ...prevState,
          loading: false
        })
      });

    default:
      return state;
  }
};

export default articleReducer;
