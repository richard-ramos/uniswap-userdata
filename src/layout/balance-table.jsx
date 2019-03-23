import React, {Fragment} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {fromWei} from 'web3-utils';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  icon: {
    width: '1rem',
    height: '1rem',
    position: 'relative',
    top: '4px',
    marginRight: theme.spacing.unit * 2
  }
});

const BalanceTable = ({classes, balances}) => (
  <Fragment>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="body1" color="primary">Token</Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="body1" color="primary">Balance</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(balances).filter(k => k !== 'ETH').map((symbol, i) => (
          <TableRow key={i}>
            <TableCell component="th" scope="row">
              <img className={classes.icon} src={process.env.PUBLIC_URL + "/images/" + symbol + ".png"} alt="" /> <b>{symbol}</b>
            </TableCell>
            <TableCell align="right">{fromWei(balances[symbol], 'ether')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Fragment>
);

BalanceTable.propTypes = {
  balances: PropTypes.object,
  classes: PropTypes.object
};

export default withStyles(styles)(BalanceTable);
