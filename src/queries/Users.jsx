import React, { Fragment } from 'react';
import { Query } from "react-apollo";
import {LOAD_USER_DATA} from '../api/gql';
import CardItem from "../layout/CardItem";

const Users = ({ onDogSelected }) => (
  <Query query={LOAD_USER_DATA}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return <Fragment>
          {data.users.map((user, i) => (
            <CardItem key={i} id={user.id} />
          ))}
          </Fragment>;
    }}
  </Query>
);

export default Users