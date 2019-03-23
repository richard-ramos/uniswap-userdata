
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
import {withTranslation} from "react-i18next";

const FormDialog = ({handleClose, open, t}) => (<Dialog open={open} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">{t('form-dialog.title')}</DialogTitle>
  <DialogContent>
    <div>
      <FormControl>
        <InputLabel>{t('form-dialog.from')}</InputLabel>
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
        <InputLabel>{t('form-dialog.to')}</InputLabel>
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
        label={t('form-dialog.amount')}
        type="number"
        step="any"
        fullWidth
      />
    </div>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      {t('form-dialog.cancel')}
    </Button>
    <Button onClick={handleClose} color="primary">
      {t('form-dialog.transfer')}
    </Button>
  </DialogActions>
</Dialog>
);

FormDialog.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  t: PropTypes.func
};

export default withTranslation()(FormDialog);
