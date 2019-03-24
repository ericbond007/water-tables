import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import { getWaterSuccess, getWaterFailure, getWater24HourSuccess, getWaterSeriesSuccess } from './actions';
import { 
  GET_WATER, 
  GET_WATER_24_HOURS, 
  GET_WATER_SERIES,
  SET_PICKER_VAL,
} from './constants';

import { makeSelectPickerValue } from 'containers/App/selectors';

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

export function* getWaterSeries() {
  const pickerValue = yield select(makeSelectPickerValue());
  const requestURL = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=03372400&siteStatus=all&period=PT${pickerValue}H`

  try {
    const water = yield call(request, requestURL);
    yield put(getWaterSeriesSuccess(water));
  } catch (err) {
    yield put(getWaterFailure(err));
  }
}

export default function* waterPageSaga() {
  yield takeLatest(GET_WATER, getWater);
  yield takeLatest(GET_WATER_24_HOURS, getWater24);
  yield takeLatest(GET_WATER_SERIES, getWaterSeries);
  yield takeLatest(SET_PICKER_VAL, getWaterSeries);
}
