
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

  handleClick = () => {
    this.props.handleClose();
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
          <Button onClick={this.handleClick} color="primary">
            {t('form-dialog.transfer')}
          </Button>
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

export default withTranslation()(withStyles(styles)(FormDialog));
