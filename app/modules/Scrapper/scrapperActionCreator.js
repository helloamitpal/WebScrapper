import * as actionTypes from './scrapperActionTypes';

export const fetchLinks = (url) => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.FETCH_LINKS,
    promise: api.get(`/api/scrappers?url=${url}`),
    payload: {}
  });
};

export const fetchSavedLinks = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.FETCH_SAVED_LINKS,
    promise: api.get('/api/savedLinks'),
    payload: {}
  });
};

export const saveLink = () => (dispatch, getState, { api }) => {
  dispatch({
    type: actionTypes.FETCH_SAVED_LINKS,
    promise: api.post('/api/saveLink'),
    payload: {}
  });
};
