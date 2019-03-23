import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  icon: {
    position: 'relative',
    top: '4px',
    marginRight: theme.spacing.unit * 2
  }
});

const GeneralError = ({ classes, message }) => (
  <Typography variant="h5" color="primary">
    <ErrorIcon className={classes.icon} color="primary" /> {message}
  </Typography>
);

GeneralError.propTypes = {
  classes: PropTypes.object,
  message: PropTypes.string
};

export default withStyles(styles)(GeneralError);
