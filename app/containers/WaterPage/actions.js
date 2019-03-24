/*
 *
 * WaterPage actions
 *
 */

import { GET_WATER, GET_WATER_SUCCESS, GET_WATER_FAILURE, GET_WATER_24_HOURS, GET_WATER_24_HOURS_SUCCESS } from './constants';

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
