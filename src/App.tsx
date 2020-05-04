import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import AppBarDrawer from './components/template/AppBarDrawer';
import Routes from './components/route/Routes';
import useStyles from './App.css';

function App() {
  const classes = useStyles();

  return (
    <div>
      <Router>
        <AppBarDrawer />
        <div className={classes.container}>
          <Routes />
        </div>
      </Router>
    </div>
  );
}

export default App;
