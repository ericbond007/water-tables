/*
 *
 * WaterPage actions
 *
 */

import { 
  GET_WATER, 
  GET_WATER_SUCCESS, 
  GET_WATER_FAILURE, 
  GET_WATER_24_HOURS, 
  GET_WATER_24_HOURS_SUCCESS, 
  GET_WATER_SERIES, 
  GET_WATER_SERIES_SUCCESS,
  SET_PICKER_VAL
} from './constants';

export function getWater() {
  return {
    type: GET_WATER,
  };
}

export function getWaterSuccess(water) {
  return {
    type: GET_WATER_SUCCESS,
    water
  };
}

export function getWater24Hour() {
  return {
    type: GET_WATER_24_HOURS
  }
}

export function getWater24HourSuccess(water) {
  return {
    type: GET_WATER_24_HOURS_SUCCESS,
    water
  }
}

export function getWaterFailure(err) {
  return {
    type: GET_WATER_FAILURE, 
    err
  };
}

export function getWaterSeries(value) {
  return {
    type: GET_WATER_SERIES,
    value
  }
} 

export function setPickerVal(value) {
  return {
    type: SET_PICKER_VAL,
    value
  }
}

export function getWaterSeriesSuccess(water) {
  return {
    type: GET_WATER_SERIES_SUCCESS,
    water
  }
}
