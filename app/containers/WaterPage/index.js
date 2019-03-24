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
} from 'containers/App/selectors';
import reducer from 'containers/App/reducer';
import saga from './saga';
import { getWater, getWater24Hour } from './actions';
import WaterList from 'components/WaterList';

/* eslint-disable react/prefer-stateless-function */
export class WaterPage extends React.Component {
componentDidMount() {
  this.props.loadWaterData()
  this.props.load24Hour()
}

  render() {
    const { loading, error, water, water24 } = this.props;
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
      <button onClick={this.props.loadWaterData}>click</button>
      <button onClick={this.props.load24Hour}>click for 24 hours</button>
      
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
