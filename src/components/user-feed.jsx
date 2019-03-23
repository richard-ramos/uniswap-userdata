import React, {Component, Fragment} from 'react';
import GeneralError from './general-error';
import InfiniteScroll from 'react-infinite-scroller';
import LinearProgress from '@material-ui/core/LinearProgress';
import LoadingIndicator from './loading-indicator';
import CardItem from './card-item';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormDialog from './form-dialog';

const styles = theme => ({
  center: {
    textAlign: 'center'
  },
  progress: {
    marginTop: theme.spacing.unit * 2
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 6,
    color: theme.palette.common.white
  }
});

class UserFeed extends Component {
  state = {
    open: false
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  render() {
    const {classes, error, loading, loadMore, data: {users}} = this.props;

    if (loading) return <LinearProgress color="primary" />;
    if (error) return <GeneralError classes={classes} message={error.message} />;

    return (<Fragment>
      <InfiniteScroll
        pageStart={0}
        initialLoad={false}
        loadMore={loadMore}
        hasMore={true}
        loader={<LoadingIndicator key={new Date().getTime()} classes={classes} />}
      >
        {users.map(({ id, txs, exchangeBalances }, i) => (
          <CardItem key={i} id={id} exchangeBalances={exchangeBalances} transactions={txs} />
        ))}
      </InfiniteScroll>

      <Fab color="primary" className={classes.fab} onClick={this.handleOpen}>
        <AddIcon />
      </Fab>

      <FormDialog open={this.state.open} handleClose={this.handleClose} addresses={[...new Set(users.map(({id}) => id))]} />
    </Fragment>);
  }
}

UserFeed.propTypes = {
  classes: PropTypes.object,
  error: PropTypes.object,
  loading: PropTypes.bool,
  loadMore: PropTypes.func,
  data: PropTypes.object
};

export default withStyles(styles)(UserFeed);
