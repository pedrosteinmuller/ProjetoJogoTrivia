import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Game from './pages/Game';

import './App.css';
import Config from './pages/Config';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/config" component={ Config } />
        <Route exact path="/game" component={ Game } />
      </Switch>
    </BrowserRouter>
  );
}
