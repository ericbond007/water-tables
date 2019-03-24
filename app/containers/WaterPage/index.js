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
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

/* eslint-disable react/prefer-stateless-function */
export class WaterPage extends React.Component {
  componentWillMount() {
    this.props.loadWaterData()
    this.props.load24Hour()
    this.props.loadWaterSeriesData()
  }

  render() {
    const { loading, error, water, selectValue, waterSeries } = this.props;
    const waterListProps = {
      loading,
      error,
      water,
    };

    return (
      <div>
        <Helmet>
          <title>WaterPage</title>
          <meta name="description" content="Description of WaterPage" />
        </Helmet>
      <div>
      <p>Heres where we show Lake Monroe Water Levels:</p>
      {/* <select onChange={(e) => this.props.loadWaterSeriesData(e.target.value)} defaultValue={selectValue}> */}
      <select onChange={(e) => this.props.setTimePickerValue(e.target.value)} defaultValue={selectValue}>
        <option value="1">1 Hour</option>
        <option value="8">8 Hours</option>
        <option value="24">24 Hours</option>
        <option value="48">48 Hours</option>
      </select>
      <button onClick={this.props.loadWaterData}>click</button>
      <button onClick={this.props.load24Hour}>click for 24 hours</button>
      <LineChart width={700} height={400} data={waterSeries}>
        <XAxis dataKey="dateTime" />
        <YAxis type="number" domain={['auto', 'auto']} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
      
      <p>{water}</p>
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
