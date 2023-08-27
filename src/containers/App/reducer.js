import { produce } from 'immer';

import { SET_LOCAL, SET_THEME } from '@containers/App/constants';

export const initialState = {
  locale: 'id',
  theme: 'dark',
};

export const storedKey = ['locale', 'theme'];

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOCAL:
        draft.locale = action.locale;
        break;
      case SET_THEME:
        draft.theme = action.theme;
        break;
    }
  });

export default appReducer;
