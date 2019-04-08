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

import {
  ONE_HOUR,
  FOUR_HOUR,
  EIGHT_HOUR,
  ONE_DAY,
  TWO_DAY,
  THREE_DAY,
  SEVEN_DAY,
  ONE_MONTH,
  THREE_MONTH,
  SIX_MONTH,
  ONE_YEAR,
  TWO_YEAR,
  FIVE_YEAR,
  TEN_YEAR,
} from './constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
   makeSelectLoading,
   makeSelectError,
   makeSelectLocation,
  makeSelectPickerValue,
  makeSelectWaterSeries,
} from 'containers/App/selectors';
import reducer from 'containers/App/reducer';
import saga from './saga';
import { getWaterSeries, setPickerVal } from './actions';
import WaterList from 'components/WaterList';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

/* eslint-disable react/prefer-stateless-function */
export class WaterPage extends React.Component {
  componentDidMount() {
    // this.props.loadWaterData()
    // this.props.load24Hour()
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
    const selectOptions = [
      {
        "label": "1 Hour",
        "value": "1",
      },
      {
        "label": "4 Hours",
        "value": "4",
      },
      {
        "label": "8 Hours",
        "value": "8",
      },
      {
        "label": "24 Hours",
        "value": "24",
      },
      {
        "label": "48 Hours",
        "value": "48",
      },
      {
        "label": "3 Days",
        "value": "3D",
      },
      {
        "label": "7 Days",
        "value": "7D",
      },
      {
        "label": "1 Month",
        "value": "30D",
      },
      {
        "label": "3 Months",
        "value": "90D",
      },
      {
        "label": "6 Months",
        "value": "180D",
      },
      {
        "label": "9 Months",
        "value": "270D",
      },
      {
        "label": "1 Year",
        "value": "365D",
      },
      {
        "label": "2 Years",
        "value": "723D",
      },
      {
        "label": "5 Years",
        "value": "1825D",
      },
    ]

    return (
      <div>
        <Helmet>
          <title>WaterPage</title>
          <meta name="description" content="Description of WaterPage" />
        </Helmet>
        <div>
          <p>Heres where we show Lake Monroe Water Levels:</p>
          <select onChange={(e) => this.props.setTimePickerValue(e.target.value)} defaultValue={selectValue}>
            {selectOptions.map(option =>
              <option key={option.value} value={option.value} label={option.label}>{option.label}</option>
            )};
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
  loading: makeSelectLoading(),
  error: makeSelectError(),
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
