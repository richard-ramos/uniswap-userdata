import gql from 'graphql-tag';

// Using `skip` like examples here: https://thegraph.com/docs/graphql-api
// I tried using cursors but they seem to not be supported

export const LOAD_USER_DATA = gql`
  query users($skip: Int) {
    users(first: 7, skip: $skip) {
      id,
      txs {
        id,
        timeStamp,
        ethAmount,
        tokenAmount,
        tokenSymbol
      }
    }
  }
`;

