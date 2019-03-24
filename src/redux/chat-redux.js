import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:8080')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chat(state=initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length, users: action.payload.users}
    case MSG_RECV:
      const n = action.payload.to === action.userid ? 1 : 0
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n}
    case MSG_READ:
    default:
      return state
  }
}

function msgList(msgs, users, userid) {
  return { type: MSG_LIST, payload: { msgs, users, userid} }
}

function msgRecv(data, userid) {
  return { type: MSG_RECV, payload: data, userid}
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/msglist')
      .then(res => {
        const userid = getState().user._id
        if (res.status === 200 && res.data.code === 0) {
          dispatch(msgList(res.data.msgs, res.data.users, userid))
        }
      })
  }
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', data => {
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}

export function sendMsg({from, to, msg}) {
  socket.emit('sendmsg', { from, to, msg })
}
