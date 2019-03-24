import React from 'react'
// import io from 'socket.io-client'
import { List, InputItem, NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat-redux'

// const socket = io('ws://localhost:8080')

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }

  componentDidMount() {
    this.props.getMsgList()
    this.props.recvMsg()
    // socket.on('recvmsg', data => {
    //   this.setState({
    //     msg: [...this.state.msg, data.text ]
    //   })
    // })
  }
  
  
  handleSubmit(e) {
    // socket.emit('sendmsg', {text: this.state.text})
    // this.setState({text: ''})
    e.preventDefault()
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    sendMsg({from, to, msg})
    this.setState({
      text: ''
    })
  }
  
  render() {
    const user = this.props.match.params.user
    const Item = List.Item
    return (
      <div id="chat-page">
        <NavBar>user</NavBar>
        {this.props.chat.chatmsg.map(v => {
          return v.from === user ? (
            <List key={v._id}>
              <Item>{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item
                className="chat-me"
                extra={'avatar'}
              >{v.content}</Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => {
                this.setState({
                  text: v
                })
              }}
              extra={<span onClick={(e) => this.handleSubmit(e)}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
