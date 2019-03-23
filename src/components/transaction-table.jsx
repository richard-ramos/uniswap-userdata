import React, { Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { fromWei } from 'web3-utils';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import * as moment from 'moment';

const styles = theme => ({
  icon: {
    width: '1rem',
    height: '1rem',
    position: 'relative',
    top: '4px',
    marginRight: theme.spacing.unit * 2
  }
});

const TransactionTable = ({ classes, transactions }) => (
  <Fragment>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="right" width="5%">
            <Typography variant="body1" color="primary">
            #
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" color="primary">
              Date
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" color="primary">
              Event
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1" color="primary">
              Token
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="body1" color="primary">
              ETH Amount
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="body1" color="primary">
              Token Amount
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.length === 0 && <TableRow>
          <TableCell colSpan="6">
            <Typography color="primary" variant="body1">
              No transactions found
            </Typography>
          </TableCell>
        </TableRow>}
        {
          transactions.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row" align="right">
                {transactions.length - i}
              </TableCell>
              <TableCell>
                {moment(row.timeStamp * 1000).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
              <TableCell>
                {row.event}
              </TableCell>
              <TableCell>
                <img className={classes.icon} src={process.env.PUBLIC_URL + '/images/' + row.tokenSymbol + '.png'} alt="" />{' '}
                <b>{row.tokenSymbol}</b>
              </TableCell>
              <TableCell align="right">{fromWei(row.ethAmount, 'ether')}</TableCell>
              <TableCell align="right">{fromWei(row.tokenAmount, 'ether')}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </Fragment>
);

TransactionTable.propTypes = {
  transactions: PropTypes.array,
  classes: PropTypes.object
};

export default withStyles(styles)(TransactionTable);
