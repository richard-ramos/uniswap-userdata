import React from 'react';
import { Query } from "react-apollo";
import {LOAD_USER_DATA} from '../api/gql';
import CardItem from "../layout/CardItem";
import InfiniteScroll from 'react-infinite-scroller';

const Users = () => <Query query={LOAD_USER_DATA}>
  {({ loading, error, data, fetchMore }) => {
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    
    return <InfiniteScroll
        pageStart={0}
        initialLoad={false}
        loadMore={() => fetchMore({
          query: LOAD_USER_DATA,
          variables: { skip: data.users.length },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const prevData = previousResult.users;
            const newData = fetchMoreResult.users;
            return {users: [...prevData, ...newData]};
          }
          })}
        hasMore={true}
        loader={<div className="loader" key={0}>Loading ...</div>}>
      {data.users.map((user, i) => (
          <CardItem key={i} id={user.id} />
      ))}    
    </InfiniteScroll>;
  }}
</Query>;

export default Users