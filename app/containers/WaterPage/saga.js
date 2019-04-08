import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import { getWaterSeriesFailure, getWaterSeriesSuccess } from './actions';
import { 
  GET_WATER_SERIES,
  SET_PICKER_VAL,
} from './constants';

import { makeSelectPickerValue } from 'containers/App/selectors';


export function* getWaterSeries() {
  const pickerValue = yield select(makeSelectPickerValue());
  let requestURL;

  if (pickerValue <= 48) {
     requestURL = `https://waterservices.usgs.gov/nwis/iv/?format=json&indent=on&sites=03372400&period=PT${pickerValue}H&siteStatus=all`
  } else {
     requestURL = `https://waterservices.usgs.gov/nwis/dv/?format=json&indent=on&sites=03372400&period=P${pickerValue}&siteStatus=all`
  
  }

  try {
    const water = yield call(request, requestURL);
    yield put(getWaterSeriesSuccess(water));
  } catch (err) {
    yield put(getWaterSeriesFailure(err));
  }
}

export default function* waterPageSaga() {
  yield takeLatest(GET_WATER_SERIES, getWaterSeries);
  yield takeLatest(SET_PICKER_VAL, getWaterSeries);
}
