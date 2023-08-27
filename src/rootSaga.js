import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import shortUrlSaga from '@containers/ShortUrl/saga';

export default function* rootSaga() {
  yield all([appSaga(), shortUrlSaga()]);
}
