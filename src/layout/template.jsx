import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['A500'],
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 20,
    padding: 20,
    paddingBottom: 200
  },
  grid: {
    width: 1000
  }
});

const Template = ({classes, children}) => (
  <div className={classes.root}>
    <Grid container justify="center">
      <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  </div>
);

Template.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default withStyles(styles)(Template);
