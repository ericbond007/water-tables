import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectWaterPageDomain = state => state.get('waterPage', initialState);


const makeSelectWaterPage = () =>
  createSelector(selectWaterPageDomain, substate => substate.toJS());

export { 
  makeSelectWaterPage,
  selectWaterPageDomain,
};
