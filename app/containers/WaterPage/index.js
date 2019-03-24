/**
 *
 * WaterPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import WaterChart from 'components/WaterChart';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
   makeSelectLoading,
   makeSelectError,
   makeSelectLocation,
   makeSelectWater,
   makeSelectWater24Hour,
  makeSelectPickerValue,
  makeSelectWaterSeries
} from 'containers/App/selectors';
import reducer from 'containers/App/reducer';
import saga from './saga';
import { getWater, getWater24Hour, getWaterSeries, setPickerVal } from './actions';
import WaterList from 'components/WaterList';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

/* eslint-disable react/prefer-stateless-function */
export class WaterPage extends React.Component {
  componentWillMount() {
    this.props.loadWaterData()
    this.props.load24Hour()
    this.props.loadWaterSeriesData()
  }

  render() {
    const { loading, error, water, selectValue, waterSeries } = this.props;
    const waterChartProps = {
      loading,
      error,
      water,
      selectValue,
      waterSeries,
    };

    return (
      <div>
        <Helmet>
          <title>WaterPage</title>
          <meta name="description" content="Description of WaterPage" />
        </Helmet>
      <div>
      <p>Heres where we show Lake Monroe Water Levels:</p>
      <select onChange={(e) => this.props.setTimePickerValue(e.target.value)} defaultValue={selectValue}>
        <option value="T1H">1 Hour</option>
        <option value="T8H">8 Hours</option>
        <option value="T24H">24 Hours</option>
        <option value="T48H">48 Hours</option>
        <option value="3D">3 Days</option>
        <option value="7D">7 Days</option>
        <option value="31D">31 Days</option>
      </select>

      <WaterChart {...waterChartProps} />

      </div>
      </div>
    );
  }
}

WaterPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  water: makeSelectWater(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  water24: makeSelectWater24Hour(),
  waterSeries: makeSelectWaterSeries(),
  selectValue: makeSelectPickerValue(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadWaterData: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(getWater())
    },
    load24Hour: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(getWater24Hour())
    },
    setTimePickerValue: (select) => {
      dispatch(setPickerVal(select))
    },
    loadWaterSeriesData: (select) => {
      dispatch(getWaterSeries(select))
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'waterPage', reducer });
const withSaga = injectSaga({ key: 'waterPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WaterPage);
