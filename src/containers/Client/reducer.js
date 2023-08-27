import { produce } from 'immer';

import { SET_LOGIN, SET_PROFILE } from '@containers/Client/constants';

export const initialState = {
  login: false,
  profile: { username: 'phinconer', email: 'phinconer@phincon.com' },
};

export const storedKey = [];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.login = action.login;
        break;
      case SET_PROFILE:
        draft.profile = action.profile;
        break;
    }
  });

export default clientReducer;
