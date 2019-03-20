import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import reducer from './reducer';
import './config'

const chromeReduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : () => { }

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  chromeReduxDevtools()
))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" />
        <Route path="/dashboard" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'))
