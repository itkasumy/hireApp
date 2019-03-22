import axios from "axios"
import { getRedirectPath } from '../util';

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SECCESS = 'AUTH_SECCESS'
const LOGOUT = 'LOGOUT'

const initState = {
  redirectTo: '',
  user: '',
  pwd: '',
  type: '',
  // isAuth: false,
  msg: ''
}

export function user(state=initState, action) {
  switch (action.type) {
    // case LOGIN_SUCCESS:
      //  return { ...state, msg: '登录成功', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload}
    // case REGISTER_SUCCESS:
      // return { ...state, msg: '', isAuth: true, redirectTo: getRedirectPath(action.payload), ...action.payload }
    case AUTH_SECCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload),  ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload }
    case LOGOUT:
      return { ...initState, redirectTo: '/login'}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state
  }
}

function errMsg(msg) {
  return { msg, type: ERROR_MSG }
}

// function loginSuccess(data) {
//   return { type: AUTH_SECCESS, payload: data, redirectTo: ''}
// }

// function registSuccess(data) {
//   return { type: AUTH_SECCESS, payload: data}
// }

function authSuccess(obj) {
  const {pwd, ...data} = obj
  return {type: AUTH_SECCESS, payload: data}
}

export function loadData(data) {
  return {type: LOAD_DATA, payload: data}
}

export function logoutSubmit() {
  console.log(666666);
  
  return {type: LOGOUT}
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errMsg('用户名和密码不能为空!')
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errMsg(res.data.msg))
        }
      })
  }
}

export function regist({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !repeatpwd) {
    return errMsg('用户名或密码不能为空!')
  }
  if (pwd !== repeatpwd) {
    errMsg('确认密码和密码不同!')
  }

  return dispatch => {
    axios.post('/user/regist', {user, pwd, type})
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({user, pwd, type}))
        } else {
          dispatch(errMsg(res.data.msg))
        }
      })
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errMsg(res.data.msg))
        }
      })
  }
}
