import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const BalanceTable = () => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Asset</TableCell>
        <TableCell align="right">Balance</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell component="th" scope="row">
          [] ETH
        </TableCell>
        <TableCell align="right">10</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          [] BAT
        </TableCell>
        <TableCell align="right">10</TableCell>
      </TableRow>
      <TableRow>
        <TableCell component="th" scope="row">
          []DAI
        </TableCell>
        <TableCell align="right">10</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export default BalanceTable;
