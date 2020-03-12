import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import {
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Button
} from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";

import firebase from "../firebase";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    marginTop: theme.spacing(3)
  }
});

const Dashboard = props => {
  const { classes } = props;

  // state
  const [quote, setQuote] = useState("");

  // useEffect
  useEffect(() => {
    firebase.getCurrentUserQuote().then(setQuote);
  }, []);

  // check if username exist or logged in
  if (!firebase.getCurrentUsername()) {
    alert("Please login first!");
    props.history.replace("/login");
    return null;
  }

  // functions
  const logout = async () => {
    await firebase.logout();
    props.history.push("/");
  };

  return (
    <Paper className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUserOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Hello {firebase.getCurrentUsername()}
        </Typography>
        <Typography component="h1" variant="h5">
          Your quote: {quote ? `"${quote}"` : <CircularProgress size={20} />}
        </Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={logout}
          className={classes.submit}
        >
          Logout
        </Button>
      </Paper>
    </Paper>
  );
};

export default withRouter(withStyles(styles)(Dashboard));
