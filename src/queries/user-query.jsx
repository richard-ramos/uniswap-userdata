import React from 'react';
import { Query } from 'react-apollo';
import { LOAD_USER_DATA } from '../api/gql';
import PropTypes from 'prop-types';

const UserQuery = ({children}) => (
  <Query query={LOAD_USER_DATA}>
    {({ loading, error, data, fetchMore }) => 
      React.Children.map(children, child =>
        React.cloneElement(child, { error, loading, data, loadMore: loadMoreUsers(fetchMore, data.users) })
      )
    }
  </Query>
);

UserQuery.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
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

export default UserQuery;
