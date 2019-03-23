import React, { Component } from 'react';
import UserQuery from '../queries/user-query';
import UserFeed from '../layout/user-feed';

class ApplicationData extends Component {
  render() {
    return <UserQuery>
      <UserFeed />
    </UserQuery>;
  }
}

export default ApplicationData;
