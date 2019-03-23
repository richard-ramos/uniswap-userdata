import React, { Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { fromWei, toBN } from 'web3-utils';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import {withTranslation} from "react-i18next";

const styles = theme => ({
  icon: {
    width: '1rem',
    height: '1rem',
    position: 'relative',
    top: '4px',
    marginRight: theme.spacing.unit * 2
  }
});

const BalanceTable = ({ classes, balances, t }) => (
  <Fragment>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="body1" color="primary">
              {t('balance-table.asset')}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="body1" color="primary">
              {t('balance-table.balance')}
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(balances)
          .map((symbol, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                <img className={classes.icon} src={process.env.PUBLIC_URL + '/images/' + symbol + '.png'} alt="" />{' '}
                <b>{symbol}</b>
              </TableCell>
              <TableCell align="right">{balances[symbol].gt(toBN(0)) ? fromWei(balances[symbol], 'ether') : '0'}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </Fragment>
);

BalanceTable.propTypes = {
  balances: PropTypes.object,
  classes: PropTypes.object,
  t: PropTypes.func
};

export default withTranslation()(withStyles(styles)(BalanceTable));
