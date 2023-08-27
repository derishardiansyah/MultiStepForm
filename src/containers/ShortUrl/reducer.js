import { produce } from 'immer';

import { SET_SHORT_URL, SET_SHORT_URL_LOADING, SET_SHORT_URL_ERROR } from '@containers/ShortUrl/constants';

export const initialState = {
  shortUrl: [],
  shortUrlLoading: false,
  shortUrlError: null,
};

export const storedKey = ['shortUrl'];

const shortUrlReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SHORT_URL:
        draft.shortUrl = [...draft.shortUrl, action.shortUrl];
        break;
      case SET_SHORT_URL_LOADING:
        draft.shortUrlLoading = action.shortUrlLoading;
        break;
      case SET_SHORT_URL_ERROR:
        draft.shortUrlError = action.shortUrlError;
        break;
    }
  });

export default shortUrlReducer;
