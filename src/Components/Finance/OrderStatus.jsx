import React from "react";
import {
  withStyles,
  Paper,
  Badge,
  Typography,
  Grid,
  Divider,
  Table,
} from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import CreateIcon from "@material-ui/icons/Create";
import ScreenShareRoundedIcon from "@material-ui/icons/ScreenShareRounded";
import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded";
import DoneAllRoundedIcon from "@material-ui/icons/DoneAllRounded";

const styles = {
  root: {
    padding: 20,
    margin: 10,
  },
  paper: {
    height: 120,
    width: 120,
    borderRadius: 200,
  },
  icons: {
    marginTop: 30,
    color: '#818181'
  },
  progress: {
    padding: 6,
    width: 150,
    marginTop: 55,
    backgroundColor: "#FFFFFF",
  },
};

class OrderStatus extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item>
            <Paper className={classes.paper}>
              <CreateIcon fontSize="large" className={classes.icons} />
              <Typography variant="body2">Created</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Divider className={classes.progress} />
          </Grid>

          <Grid item>
            <Paper className={classes.paper}>
              <ScreenShareRoundedIcon
                fontSize="large"
                className={classes.icons}
              />
              <Typography variant="body2">Issued</Typography>
            </Paper>
          </Grid>
          <Divider className={classes.progress} />
          <Grid item>
            <Paper className={classes.paper}>
              <DoneAllRoundedIcon fontSize="large" className={classes.icons} />
              <Typography variant="body2">Delievered</Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Divider className={classes.progress} />
          </Grid>

          <Grid item>
            <Paper className={classes.paper}>
              <ReceiptRoundedIcon fontSize="large" className={classes.icons} />
              <Typography variant="body2">Invoiced</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(OrderStatus);
