import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingIndicator = ({classes}) => (
  <div className={classes.center}>
    <CircularProgress className={classes.progress} color="primary" />
  </div>
);

LoadingIndicator.propTypes = {
  classes: PropTypes.object
};

export default LoadingIndicator;
