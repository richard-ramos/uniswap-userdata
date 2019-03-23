
import React from 'react';
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

const FormDialog = ({handleClose, open}) => (<Dialog open={open} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">Transfer ETH</DialogTitle>
  <DialogContent>
    <div>
      <FormControl>
        <InputLabel>From</InputLabel>
        <Select value="0x0000000000000000000000000000000000000000" fullWidth>
          <MenuItem value="">
            <em>0x0000000000000000000000000000000000000000</em>
          </MenuItem>
          <MenuItem value={"0x0000000000000000000000000000000000000001"}>0x0000000000000000000000000000000000000001</MenuItem>
          <MenuItem value={"0x0000000000000000000000000000000000000002"}>0x0000000000000000000000000000000000000002</MenuItem>
        </Select>
      </FormControl>
    </div>
    <div>
      <FormControl>
        <InputLabel>To</InputLabel>
        <Select value="0x0000000000000000000000000000000000000000" fullWidth>
          <MenuItem value="">
            <em>0x0000000000000000000000000000000000000000</em>
          </MenuItem>
          <MenuItem value={"0x0000000000000000000000000000000000000001"}>0x0000000000000000000000000000000000000001</MenuItem>
          <MenuItem value={"0x0000000000000000000000000000000000000002"}>0x0000000000000000000000000000000000000002</MenuItem>
        </Select>
      </FormControl>
    </div>
    <div>
      <TextField
        autoFocus
        margin="dense"
        id="amount"
        label="Amount"
        type="number"
        step="any"
        fullWidth
      />
    </div>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button onClick={handleClose} color="primary">
      Transfer
    </Button>
  </DialogActions>
</Dialog>
);

FormDialog.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool
};

export default FormDialog;
