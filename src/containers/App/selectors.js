import { createSelector } from 'reselect';
import { initialState } from '@containers/App/reducer';

const selectAppState = (state) => state.app || initialState;

export const selectLocale = createSelector(selectAppState, (state) => state.locale);
export const selectTheme = createSelector(selectAppState, (state) => state.theme);
