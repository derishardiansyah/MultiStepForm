import {
  GET_SHORT_URL,
  SET_SHORT_URL,
  SET_SHORT_URL_ERROR,
  SET_SHORT_URL_LOADING,
} from '@containers/ShortUrl/constants';

export const getShortUrl = (url) => ({
  type: GET_SHORT_URL,
  url,
});

export const setShortUrl = (shortUrl) => ({
  type: SET_SHORT_URL,
  shortUrl,
});

export const setShortUrlLoading = (shortUrlLoading) => ({
  type: SET_SHORT_URL_LOADING,
  shortUrlLoading,
});

export const setShortUrlError = (shortUrlError) => ({
  type: SET_SHORT_URL_ERROR,
  shortUrlError,
});
