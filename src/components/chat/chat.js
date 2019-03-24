import React from 'react'
// import io from 'socket.io-client'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat-redux'
import { getChatId } from '../../util'

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
      msg: [],
      showEmoji: false
    }
  }

  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    this.fixCarousel()
  }
  
  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
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
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if (!users[userid]) {
      return null
    }
    const emoji = '😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😇 😍 🤩 😘 😗 😚 😙 😋 😛 😜 🤪 😝 🤑 🤗 🤭 🤫 🤔 🤐 🤨 😐 😑 😶 😏 😒 🙄 😬 🤥 😌 😔 😪 🤤 😴 😷 🤒 🤕 🤢 🤮 🤧 😵 🤯 🤠 😎 🤓 🧐 😕 😟 🙁 😮 😯 😲 😳 😦 😧 😨 😰 😥 😢 😭 😱 😖 😣 😞 😓 😩 😫 😤 😡 😠 🤬 😈 👿 💀 💩 🤡 👹 👺 👻 👽 👾 🤖 😺 😸 😹 😻 😼 😽 🙀 😿 😾 💋 👋 🤚 🖐 🖖 👌 🤞 🤟 🤘 🤙 👈 👉 👆 🖕 👇 👍 👎 👊 🤛 🤜 👏 🙌 👐 🤲 🤝 🙏 💅 🤳 💪 👂 👃 🧠 👀 👁 👅 👄 👶 🧒 👦 👧 🧑 👱 👨 🧔 👩 🧓 👴 👵 🙍 🙎 🙅 🙆 🙋 🙇 🤦 👨‍🎓 👩‍ 👕 👖 🧣 🧤 🧥 🧦 👗 👘 👙 👚 👛 👜 👝 🎒 👞 👟 👠 👡 👢 👑 👒 🎩 🎓 🧢 ⛑ 💄 💍 💼'.split(' ').filter(v => v).map(v => ({ text: v }))
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)

    return (
      <div id="chat-page">
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => {this.props.history.goBack()}}
        >{users[userid].name}</NavBar>
        {chatmsgs.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === userid ? (
            <List key={v._id}>
              <Item
                thumb={avatar}
                >{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item
                className="chat-me"
                extra={<img src={avatar} alt="" />}
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
              extra={<div>
                <span
                  style={{marginRight: 12}}
                  onClick={() => {
                    this.setState({
                      showEmoji: !this.state.showEmoji
                    })
                    this.fixCarousel()
                  }}
                  role="img"
                  aria-label=""
                >😀</span>
                <span onClick={(e) => this.handleSubmit(e)}>发送</span>
              </div>}
            ></InputItem>
          </List>
          {this.state.showEmoji ? <Grid
            data={emoji}
            columnNum={9}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={el => this.setState({
              text: this.state.text + el.text
            })}
          /> : null}
        </div>
      </div>
    )
  }
}

export default Chat
