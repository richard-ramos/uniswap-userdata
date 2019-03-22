import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Blockie from 'react-blockies';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import BalanceTable from './BalanceTable';

const styles = theme => ({
  card: {
    minWidth: 275,
    margin: theme.spacing.unit * 3
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});





class CardItem extends Component {

  render() {
    const { classes } = this.props;

    return (

      <Card className={classes.card}>
      <CardActionArea>
      <CardHeader
          avatar={
            <Blockie seed="0x123456789012345678912345678901234567890" />
          }
          title="0x123456789012345678912345678901234567890"
          subheader="UserID"
        />
      <CardContent>
          <BalanceTable />
      </CardContent>
      </CardActionArea>
    </Card>
    )
  }
}

export default withStyles(styles)(CardItem);