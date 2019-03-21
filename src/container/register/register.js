import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { regist } from '../../redux/user-redux'

import Logo from '../../components/logo/logo'

@connect(
  state => state.user,
  {regist}
)
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'genius', // boss
      user: '',
      pwd: '',
      repeatpwd: ''
    }
    this.handleRegist = this.handleRegist.bind(this)
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleRegist() {
    this.props.regist(this.state)
    console.log(this.state)
  }
  
  render() {
    const RadioItem = Radio.RadioItem
    return (<div>
      <Logo></Logo>
      <WingBlank>
        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
        <List>
          <InputItem
            onChange={v => this.handleChange('user', v)}
          >用户名</InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={v => this.handleChange('pwd', v)}
          >密码</InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={v => this.handleChange('repeatpwd', v)}
          >确认密码</InputItem>
          <WhiteSpace />
          <RadioItem
            checked={this.state.type === 'genius'}
            onChange={() => this.handleChange('type', 'genius')}
          >牛人</RadioItem>
          <RadioItem
            checked={this.state.type === 'boss'}
            onChange={() => this.handleChange('type', 'boss')}
          >BOSS</RadioItem>
        </List>
        <WhiteSpace />
        <Button
          type="primary"
          onClick={this.handleRegist}
        >注册</Button>
      </WingBlank>
    </div>)
  }
}

export default Login
