import { createSelector } from 'reselect';
import { initialState } from '@containers/ShortUrl/reducer';

const selectClientState = (state) => state.client || initialState;

export const selectLogin = createSelector(selectClientState, (state) => state.login);
export const selectProfile = createSelector(selectClientState, (state) => state.profile);
