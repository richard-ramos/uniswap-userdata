/* eslint-disable no-unused-vars  */

import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import {withTranslation} from "react-i18next";
import withStyles from '@material-ui/core/styles/withStyles';

import { Mutation, ApolloConsumer } from "react-apollo";
import { LOAD_USER_DATA, ADD_ETH_TRANSACTION } from '../api/gql';
import {toWei} from 'web3-utils';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 400
  }
});
class FormDialog extends Component {
  state = {
    from: '',
    to: '',
    amount: 0
  }

  handleChange = (field) => (e) => {
    this.setState({[field]: e.target.value});
  }

  handleClick = (client, mutation) => async () => {
    // TODO: add validations to input fields

    // Here we would normally execute a mutation, and have the updateData function called,
    // which would do something like const {users} = cache.readQuery({ query: LOAD_USER_DATA });
    // to read the data from the cache... Since it will fail anyways ¯\_(ツ)_/¯, 
    // for this exercise we call the updateData directly and the mutation is not executed
    
    this.updateData(client);
    
    /*
    await mutation({ 
      variables: { 
        ...this.state,
        tokenSymbol: "ETH"
      },
      optimisticResponse: {
        __typename: "Mutation",
        transaction: {
          ...this.state,
          tokenSymbol: "ETH",
          __typename: "Transaction"
        }
      }
    });
    */

    this.props.handleClose();
  }

  updateData = client => {
    const {users} = client.readQuery({ query: LOAD_USER_DATA });
    const amount = toWei(this.state.amount.toString(), 'ether');

    const to = users.find(x => x.id === this.state.to);
    const from = users.find(x => x.id === this.state.from);
    
    to.exchangeBalances.push({
      ethBought: "0",
      ethDeposited: amount,
      ethWithdrawn: "0",
      id: "ETH-" + makeid(40),
      tokensBought: "0",
      tokensDeposited: "0",
      tokensWithdrawn: "0",
      totalEthFeesPaid: "0",
      totalTokenFeesPaid: "0",
      __typename: "UserExchangeBalance"
    });

    from.exchangeBalances.push({
      ethBought: "0",
      ethDeposited: "0",
      ethWithdrawn: amount,
      id: "ETH-" + makeid(40),
      tokensBought: "0",
      tokensDeposited: "0",
      tokensWithdrawn: "0",
      totalEthFeesPaid: "0",
      totalTokenFeesPaid: "0",
      __typename: "UserExchangeBalance"
    });

    from.txs.push({
      event: "EthTransfer",
      timeStamp: Math.floor((new Date()).getTime() / 1000),
      ethAmount: "-" + toWei(this.state.amount.toString(), 'ether'),
      tokenAmount: "0",
      tokenSymbol: "ETH",
      __typename: "Transaction"
    });

    to.txs.push({
      event: "EthTransfer",
      timeStamp: Math.floor((new Date()).getTime() / 1000),
      ethAmount: toWei(this.state.amount.toString(), 'ether'),
      tokenAmount: "0",
      tokenSymbol: "ETH",
      __typename: "Transaction"
    });
    
    client.writeQuery({
      query: LOAD_USER_DATA,
      data: { users }
    });
  }

  render(){
    const {handleClose, open, t, classes, addresses} = this.props;
    const {from, to, amount} = this.state;
    return (
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('form-dialog.title')}</DialogTitle>
        <DialogContent>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel>{t('form-dialog.from')}</InputLabel>
              <Select value={from} onChange={this.handleChange('from')} autoWidth={true}>
                <MenuItem value=""></MenuItem>
                {addresses.filter(x => x !== to).map(address => <MenuItem key={address} value={address}>{address}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel>{t('form-dialog.to')}</InputLabel>
              <Select value={to} onChange={this.handleChange('to')} autoWidth={true}>
                <MenuItem value=""></MenuItem>
                {addresses.filter(x => x !== from).map(address => <MenuItem key={address} value={address}>{address}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="amount"
                label={t('form-dialog.amount')}
                type="number"
                step="any"
                onChange={this.handleChange('amount')}
                value={amount}
                fullWidth
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('form-dialog.cancel')}
          </Button>

          <ApolloConsumer>
            { client => <Mutation mutation={ADD_ETH_TRANSACTION}>
              {(userMutation) => (
                <Button onClick={this.handleClick(client, userMutation)} color="primary">
                  {t('form-dialog.transfer')}
                </Button>
              )}
            </Mutation>}
          </ApolloConsumer>

        </DialogActions>
      </Dialog>
    );
  }
} 

FormDialog.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  classes: PropTypes.object,
  addresses: PropTypes.array,
  t: PropTypes.func
};

const makeid = (length) => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

export default withTranslation()(withStyles(styles)(FormDialog));
