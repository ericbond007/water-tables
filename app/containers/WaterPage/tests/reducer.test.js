import { fromJS } from 'immutable';
import waterPageReducer from '../reducer';

describe('waterPageReducer', () => {
  it('returns the initial state', () => {
    expect(waterPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
