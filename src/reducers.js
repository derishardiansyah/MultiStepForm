import { combineReducers } from 'redux';

import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  client: { reducer: clientReducer, whitelist: storedClientState },
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
