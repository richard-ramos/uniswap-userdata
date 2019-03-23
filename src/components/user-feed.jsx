import React from 'react';
import GeneralError from './general-error';
import InfiniteScroll from 'react-infinite-scroller';
import LinearProgress from '@material-ui/core/LinearProgress';
import LoadingIndicator from './loading-indicator';
import CardItem from './card-item';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  center: {
    textAlign: 'center'
  },
  progress: {
    marginTop: theme.spacing.unit * 2
  }
});

const UserFeed = ({classes, error, loading, loadMore, data: {users}}) => {
  if (loading) return <LinearProgress color="primary" />;
  if (error) return <GeneralError classes={classes} message={error.message} />;

  return (
    <InfiniteScroll
      pageStart={0}
      initialLoad={false}
      loadMore={loadMore}
      hasMore={true}
      loader={<LoadingIndicator key={new Date().getTime()} classes={classes} />}
    >
      {users.map(({ id, txs }, i) => (
        <CardItem key={i} id={id} transactions={txs} />
      ))}
    </InfiniteScroll>
  );
};

UserFeed.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
  loadMore: PropTypes.func,
  data: PropTypes.object
};

export default withStyles(styles)(UserFeed);
