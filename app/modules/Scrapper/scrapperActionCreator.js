import * as actionTypes from './scrapperActionTypes';

export const fetchLinks = (url) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.FETCH_LINKS,
    promise: api.get(`/api/scrappers?url=${url}`),
    payload: {}
  });
};
