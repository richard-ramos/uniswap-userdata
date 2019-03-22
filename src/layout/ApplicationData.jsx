import React, {Component, Fragment} from 'react';
import CardItem from "./CardItem";
import Users from "../queries/Users";

class ApplicationData extends Component {
  render() {
  /*  <InfiniteScroll
    pageStart={0}
    loadMore={loadFunc}
    hasMore={true || false}
    loader={<div className="loader" key={0}>Loading ...</div>}
>
    {items} // <-- This is the content you want to load
</InfiniteScroll> */
    return <Users />;
  }
}

export default ApplicationData;
