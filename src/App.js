import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/config" component={ Config } />
      <Route exact path="/game" component={ Game } />
    </Switch>
  );
}
