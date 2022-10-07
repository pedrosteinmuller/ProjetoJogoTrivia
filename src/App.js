import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
          <header className="App-header">
            <p>SUA VEZ</p>
          </header>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
