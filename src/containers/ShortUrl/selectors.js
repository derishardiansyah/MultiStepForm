import { createSelector } from 'reselect';
import { initialState } from '@containers/ShortUrl/reducer';

const selectShortUrlState = (state) => state.shortUrl || initialState;

export const selectShortUrl = createSelector(selectShortUrlState, (state) => state.shortUrl);
export const selectShortUrlLoadinng = createSelector(selectShortUrlState, (state) => state.shortUrlLoading);
export const selectShortUrlError = createSelector(selectShortUrlState, (state) => state.shortUrlError);
