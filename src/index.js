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

import reducer from './reducer';
import './config'
import './index.css'

const chromeReduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : () => { }

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  chromeReduxDevtools()
))

function Dashboard() {
  return <h2>hhhh</h2>
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Dashboard} />
        </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
