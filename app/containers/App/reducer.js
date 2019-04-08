/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';
import {
  GET_WATER,
  GET_WATER_FAILURE,
  GET_WATER_SUCCESS,
  GET_WATER_24_HOURS,
  GET_WATER_24_HOURS_SUCCESS,
  GET_WATER_SERIES,
  GET_WATER_SERIES_SUCCESS,
  SET_PICKER_VAL,
  ONE_DAY,
} from '../WaterPage/constants';

// The initial state of the App
const initialState = fromJS({
  loading: true,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  water: false,
  water24: false,
  waterSeries: [{}],
  selectValue: '24',
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state.set('error', action.error).set('loading', false);
    case GET_WATER:
      return state
        .set('loading', true)
        .set('error', false)
        .set('water', false)
    case GET_WATER_SUCCESS:
      return state
        .set('loading', false)
        .setIn(['water'], action.water.value.timeSeries[0].values[0].value[0].value);
    case GET_WATER_FAILURE:
      return state
        .set('error', action.err)
        .set('loading', false);
    case GET_WATER_24_HOURS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('water24', false)
        // .setIn(['waterPage', 'lakeMonroe'], false);
    case GET_WATER_24_HOURS_SUCCESS:
      return state
        // .setIn(['waterPage', 'lakeMonroe'], action.water.value.timeSeries[0].values[0].value[0].value)
        .set('loading', false)
        .setIn(['water24'], action.water.value.timeSeries[0].values[0].value);
    case GET_WATER_SERIES:
      return state
        .set('loading', true)
        .set('error', false)
        .set('water', false)
    case GET_WATER_SERIES_SUCCESS:
      const realWater = action.water.value.timeSeries[0].values[0].value;
      return state
        .set('loading', false)
        .setIn(['waterSeries'], realWater);
    case SET_PICKER_VAL:
      return state
        .set('selectValue', action.value);
    default:
      return state;
  }
}

export default appReducer;
