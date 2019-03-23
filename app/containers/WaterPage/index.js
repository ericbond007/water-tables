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
  // makeSelectLoading,
  // makeSelectError,
  //makeSelectWater,
  makeSelectLocation,
} from 'containers/App/selectors';
import {
  makeSelectWaterPage,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getWater } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class WaterPage extends React.Component {
  render() {
    // const { loading, error, water } = this.props;
    return (
      <div>
        <Helmet>
          <title>WaterPage</title>
          <meta name="description" content="Description of WaterPage" />
        </Helmet>
      <div>
      <p>Heres where we show Lake Monroe Water Levels:</p>
      <button onClick={this.props.loadWaterData}>click</button>
      </div>
      </div>
    );
  }
}

WaterPage.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  waterPage: makeSelectWaterPage(),
  // water: makeSelectWater(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadWaterData: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(getWater())
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
