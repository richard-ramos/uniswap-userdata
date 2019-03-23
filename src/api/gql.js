import gql from 'graphql-tag';

// Using `skip` like examples here: https://thegraph.com/docs/graphql-api
// I tried using cursors but they seem to not be supported

export const LOAD_USER_DATA = gql`
  query users($skip: Int) {
    users(first: 7, skip: $skip) @connection(key: "feed", filter: ["type"]){
      id
      exchangeBalances {
        id
        ethDeposited
        tokensDeposited
        ethWithdrawn
        tokensWithdrawn
        ethBought
        tokensBought
        totalEthFeesPaid
        totalTokenFeesPaid
      }
      txs {
        event
        timeStamp
        ethAmount
        tokenAmount
        tokenSymbol
      }
    }
  }
`;

export const ADD_ETH_TRANSACTION = gql`
  mutation addTransaction($from: ID!, $to: ID!, $amount: BigInt!, $tokenSymbol: String!) {
    transaction(from: $from, to: $to, amount: $amount, tokenSymbol: $tokenSymbol) {
      from,
      to,
      amount,
      tokenSymbol
    }
  }
`;
