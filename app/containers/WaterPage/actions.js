/*
 *
 * WaterPage actions
 *
 */

import { GET_WATER, GET_WATER_SUCCESS, GET_WATER_FAILURE } from './constants';

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

export function getWaterFailure(err) {
  return {
    type: GET_WATER_FAILURE, 
    err
  };
}
