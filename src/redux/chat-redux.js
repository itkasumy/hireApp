import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:8080')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  unread: 0
}

export function chat(state=initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state, chatmsg: action.payload, unread: action.payload.filter(v => !v.read).length}
    case MSG_RECV:
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1}
    case MSG_READ:
    default:
      return state
  }
}

function msgList(data) {
  return { type: MSG_LIST, payload: data }
}

function msgRecv(data) {
  return {type: MSG_RECV, payload: data}
}

export function getMsgList() {
  return dispatch => {
    axios.get('/user/msglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(msgList(res.data.msgs))
        }
      })
  }
}

export function recvMsg() {
  return dispatch => {
    socket.on('recvmsg', data => {
      console.log(data)
      dispatch(msgRecv(data))
    })
  }
}

export function sendMsg({from, to, msg}) {
  socket.emit('sendmsg', { from, to, msg })
}
