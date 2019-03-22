import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Blockie from 'react-blockies';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import BalanceTable from './balance-table';
import PropTypes from 'prop-types';
import {toBN} from 'web3-utils';

const styles = theme => ({
  card: {
    minWidth: 275,
    margin: theme.spacing.unit * 3
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const ETH = 'ETH';

class CardItem extends Component {

  calculateBalances = (transactions) => {
    const balances = {};

    transactions.forEach(item => {
      balances[ETH] = (balances[ETH] || toBN(0)).add(toBN(item.tokenAmount));
      balances[item.tokenSymbol] = (balances[item.tokenSymbol] || toBN(0)).add(toBN(item.tokenAmount));
    });

    return balances;
  }

  render() {
    const { classes, id, transactions } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardHeader avatar={<Blockie seed={id} />} title={id} subheader="UserID" />
          <CardContent>
            <BalanceTable balances={this.calculateBalances(transactions)} />
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

CardItem.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.string,
  transactions: PropTypes.array
};

export default withStyles(styles)(CardItem);
