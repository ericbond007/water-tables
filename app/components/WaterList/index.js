import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';

function WaterList({ loading, error, water }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  if (water !== false) {
    return <List items={water} component={RepoListItem} />;
  }

  return null;
}

WaterList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  water: PropTypes.any,
};

export default WaterList;
