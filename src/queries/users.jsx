import React from 'react';
import { Query } from 'react-apollo';
import { LOAD_USER_DATA } from '../api/gql';
import CardItem from '../layout/card-item';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  center: {
    textAlign: 'center'
  },
  progress: {
    marginTop: theme.spacing.unit * 2
  }
});

const LoadingIndicator = ({classes}) => (
  <div className={classes.center}>
    <CircularProgress className={classes.progress} color="secondary" />
  </div>
);

const Users = ({classes}) => (
  <Query query={LOAD_USER_DATA}>
    {({ loading, error, data, fetchMore }) => {
      if (loading) return<LinearProgress color="secondary"/>;
      if (error) return `Error! ${error.message}`;

      return (
        <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          loadMore={loadMoreUsers(fetchMore, data.users)}
          hasMore={true}
          loader={<LoadingIndicator classes={classes} />}
        >
          {data.users.map((user, i) => (
            <CardItem key={i} id={user.id} />
          ))}
        </InfiniteScroll>
      );
    }}
  </Query>
);

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
