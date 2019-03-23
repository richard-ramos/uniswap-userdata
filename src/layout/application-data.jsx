import React from 'react';
import UserQuery from '../queries/user-query';
import UserFeed from '../components/user-feed';

const ApplicationData = () => (
  <UserQuery>
    <UserFeed />
  </UserQuery>
);

export default ApplicationData;
