import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Blockie from 'react-blockies';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import BalanceTable from './balance-table';
import TransactionTable from './transaction-table';
import PropTypes from 'prop-types';
import { toBN } from 'web3-utils';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = theme => ({
  card: {
    minWidth: 275,
    margin: theme.spacing.unit * 3,
    boxShadow: '0 4px 8px 0 rgba(47,128,237,.1)',
    borderRadius: '1.25rem'
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
  state = {
    open: false
  };

  openDialog = () => {
    this.setState({ open: true });
  };

  closeDialog = () => {
    this.setState({ open: false });
  };

  calculateBalances = transactions => {
    const balances = {};

    transactions.forEach(item => {
      balances[ETH] = (balances[ETH] || toBN(0)).add(toBN(item.ethAmount));
      balances[item.tokenSymbol] = (balances[item.tokenSymbol] || toBN(0)).add(toBN(item.tokenAmount));
    });

    return balances;
  };

  render() {
    const { classes, id, transactions } = this.props;
    return (
      <Fragment>
        <Card className={classes.card}>
          <CardActionArea onClick={this.openDialog}>
            <CardHeader avatar={<Blockie seed={id} />} title={id} subheader="UserID" />
            <CardContent>
              <BalanceTable balances={this.calculateBalances(transactions)} />
            </CardContent>
          </CardActionArea>
        </Card>
        <Dialog
          fullScreen={true}
          open={this.state.open}
          onClose={this.closeDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title" color="primary">
            {id}
            <IconButton color="primary" onClick={this.closeDialog} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TransactionTable id={id} transactions={transactions} />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

CardItem.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.string,
  transactions: PropTypes.array
};

export default withMobileDialog()(withStyles(styles)(CardItem));
