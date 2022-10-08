import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Config from './pages/Config';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />

        {/* <header className="App-header">
          <p>SUA VEZ</p>
        </header>
       precisei comentar o heander pois estava dando erro no Cypress,
       ass Flay */}
        {/* //  */}
        <Route exact path="/config" component={ Config } />
      </Switch>
    </BrowserRouter>
  );
}
