/*
 *
 * WaterPage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_WATER, GET_WATER_FAILURE, GET_WATER_SUCCESS } from './constants';

export const initialState = fromJS({
  water: {
    lakeMonroe: false
  }
});

function waterPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WATER_SUCCESS:
      return state
        .setIn(['water', 'lakeMonroe'], action.water)
        .set('loading', false);
    case GET_WATER_FAILURE:
      return state.set('error', action.err).set('loading', false);
    default:
      return state;
  }
}

export default waterPageReducer;
