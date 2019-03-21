import axios from "axios"

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  user: '',
  pwd: '',
  type: '',
  isAuth: false,
  msg: ''
}

export function user(state=initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', isAuth: true,  ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state
  }
}

function errMsg(msg) {
  return { msg, type: ERROR_MSG }
}

function registSuccess(data) {
  return { type: REGISTER_SUCCESS, payload: data}
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
          dispatch(registSuccess({user, pwd, type}))
        } else {
          dispatch(errMsg(res.data.msg))
        }
      })
  }
}
