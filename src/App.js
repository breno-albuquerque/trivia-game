import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import TelaDoJogo from './pages/TelaDoJogo';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/tela" component={ TelaDoJogo } />
    </Switch>
  );
}
