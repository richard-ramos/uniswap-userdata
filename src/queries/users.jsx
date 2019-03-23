import React from 'react';
import { Query } from 'react-apollo';
import { LOAD_USER_DATA } from '../api/gql';
import CardItem from '../layout/card-item';
import InfiniteScroll from 'react-infinite-scroller';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import LoadingIndicator from '../layout/loading-indicator';
import PropTypes from 'prop-types';
import GeneralError from '../layout/general-error';

const styles = theme => ({
  center: {
    textAlign: 'center'
  },
  progress: {
    marginTop: theme.spacing.unit * 2
  }
});

const Users = ({classes}) => (
  <Query query={LOAD_USER_DATA}>
    {({ loading, error, data, fetchMore }) => {
      if (loading) return <LinearProgress color="primary"/>;
      if (error) return <GeneralError classes={classes} message={error.message} />;

      return (
        <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          loadMore={loadMoreUsers(fetchMore, data.users)}
          hasMore={true}
          loader={<LoadingIndicator key={(new Date()).getTime()} classes={classes} />}
        >
          {data.users.map(({id, txs}, i) => (
            <CardItem key={i} id={id} transactions={txs} />
          ))}
        </InfiniteScroll>
      );
    }}
  </Query>
);

Users.propTypes = {
  classes: PropTypes.object
};

const loadMoreUsers = (fetchMore, userData) => () => {
  fetchMore({
    query: LOAD_USER_DATA,
    variables: { skip: userData.length },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const prevData = previousResult.users;
      const newData = fetchMoreResult.users;
      return { users: [...prevData, ...newData] };
    }
  });
};

export default withStyles(styles)(Users);
