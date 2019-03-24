import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './components/authroute/authroute'
import BossInfo from './container/bossInfo/bossInfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Dashboard from './components/dashboard/dashboard'
import Chat from './components/chat/chat'

import reducer from './reducer';
import './config'
import './index.css'

const chromeReduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : () => { }
console.log(chromeReduxDevtools)
const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  chromeReduxDevtools()
))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
