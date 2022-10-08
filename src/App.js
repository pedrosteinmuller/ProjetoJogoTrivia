import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Game from './pages/Game';

import './App.css';
import Config from './pages/Config';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/config" component={ Config } />
      <Route path="/game" component={ Game } />
    </Switch>
  );
}
