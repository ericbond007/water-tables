import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import { getWaterSuccess, getWaterFailure, getWater24HourSuccess } from './actions';
import { GET_WATER, GET_WATER_24_HOURS } from './constants';

export function* getWater() {
  const requestURL = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03372400&siteStatus=all`

  try {
    const water = yield call(request, requestURL);
    yield put(getWaterSuccess(water));
  } catch (err) {
    yield put(getWaterFailure(err));
  }
}

export function* getWater24() {
  const requestURL = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03372400&siteStatus=all&period=PT24H`

  try {
    const water = yield call(request, requestURL);
    yield put(getWater24HourSuccess(water));
  } catch (err) {
    yield put(getWaterFailure(err));
  }
}

export default function* waterPageSaga() {
  yield takeLatest(GET_WATER, getWater);
  yield takeLatest(GET_WATER_24_HOURS, getWater24);
}
