import React from 'react'
import io from 'socket.io-client'

class Chat extends React.Component {
  componentDidMount() {
    io('ws://localhost:8080')
    // socket.on('connection', () => {
    //   console.log('Front')
    // })
  }
  
  render() {
    console.log(this.props)
    return (
      <h2>chat with user: {this.props.match.params.user}</h2>
    )
  }
}

export default Chat