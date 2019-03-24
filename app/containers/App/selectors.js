/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const makeSelectCurrentUser = () =>
  createSelector(selectGlobal, globalState => globalState.get('currentUser'));

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectRepos = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['userData', 'repositories']),
  );

const makeSelectWater = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('water'),  
  );

const makeSelectWater24Hour = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('water24'),  
  );

const makeSelectWaterSeries = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('waterSeries'),  
  );

const makeSelectPickerValue = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('selectValue'),  
  );

const makeSelectWaterData = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['waterPage', 'waterData']),  
  );

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectWater,
  makeSelectWaterData,
  makeSelectWater24Hour,
  makeSelectPickerValue,
  makeSelectWaterSeries,
};
