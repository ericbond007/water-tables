/*
 *
 * WaterPage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_WATER, GET_WATER_FAILURE, GET_WATER_SUCCESS } from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  water: {
    lakeMonroe: false
  }
});

function waterPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WATER:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['water', 'lakeMonroe'], false);
    case GET_WATER_SUCCESS:
      return state
        .setIn(['water', 'lakeMonroe'], action.water.value.timeSeries[0].values[0].value[0].value)
        .set('error', false)
        .set('loading', false)
    case GET_WATER_FAILURE:
      return state.set('error', action.err).set('loading', false);
    default:
      return state;
  }
}

export default waterPageReducer;
