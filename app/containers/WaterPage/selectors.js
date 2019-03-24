import { createSelector } from 'reselect';
import { initialState } from './reducer';
// import { selectGlobal } from '../App/selectors';

const selectWater = state => state.get('waterPage', initialState);

const makeSelectWater = () =>
 createSelector(selectWater, waterState => waterState.get('waterData'));

export { 
   makeSelectWater
};
