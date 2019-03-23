import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import { getWaterSuccess, getWaterFailure } from './actions';
import { GET_WATER } from './constants';

export function* getWater() {
  const requestURL = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03372400&siteStatus=all`

  try {
    const water = yield call(request, requestURL);
    yield put(getWaterSuccess(water));
  } catch (err) {
    yield put(getWaterFailure(err));
  }
}

export default function* waterPageSaga() {
  yield takeLatest(GET_WATER, getWater);
}
