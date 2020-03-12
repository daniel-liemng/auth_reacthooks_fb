import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, CircularProgress } from "@material-ui/core";

import Dashboard from "../Dashboard";
import HomePage from "../HomePage";
import Register from "../Register";
import Login from "../Login";

import "./styles.css";

import firebase from "../firebase";

const theme = createMuiTheme();

const App = () => {
  // initialize firebase
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  // Initialize firebase at the first load
  useEffect(() => {
    firebase.isInitialized().then(val => setFirebaseInitialized(val));
  });

  return firebaseInitialized !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  );
};

export default App;
