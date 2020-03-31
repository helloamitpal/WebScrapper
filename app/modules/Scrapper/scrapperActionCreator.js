import * as actionTypes from './scrapperActionTypes';

export const fetchAllLinks = source => (dispatch, getState, { api }) => {
  const param = source ? `sources=${source}` : 'country=us';
  dispatch({
    type: actionTypes.FETCH_LINKS,
    promise: api.get(`/top-headlines?${param}`),
    payload: {}
  });
};
