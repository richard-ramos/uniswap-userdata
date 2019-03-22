import gql from 'graphql-tag';

export const LOAD_USER_DATA = gql`{
    users {
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
`
