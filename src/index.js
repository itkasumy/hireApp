import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './components/authroute/authroute'

import reducer from './reducer';
import './config'
import './index.css'

const chromeReduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : () => { }

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  chromeReduxDevtools()
))

function Boss(params) {
  return <div>BOSS </div>
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <AuthRoute></AuthRoute>
        <Route path="/boss" component={Boss} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
