import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import { regist } from '../../redux/user-redux'
import { Redirect } from 'react-router-dom'

import Logo from '../../components/logo/logo'
import FiForm from '../../components/fiForm/fiForm';

@connect(
  state => state.user,
  {regist}
)
@FiForm
class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   type: 'genius', // boss
    //   user: '',
    //   pwd: '',
    //   repeatpwd: ''
    // }
    this.handleRegist = this.handleRegist.bind(this)
  }

  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }
  

  // handleChange(key, val) {
  //   this.setState({
  //     [key]: val
  //   })
  // }

  handleRegist() {
    this.props.regist(this.props.state)
    // console.log(this.state)
  }
  
  render() {
    const RadioItem = Radio.RadioItem
    return (<div>
      {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
      <Logo></Logo>
      <WingBlank>
        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
        <List>
          <InputItem
            onChange={v => this.props.handleChange('user', v)}
          >用户名</InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={v => this.props.handleChange('pwd', v)}
          >密码</InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={v => this.props.handleChange('repeatpwd', v)}
          >确认密码</InputItem>
          <WhiteSpace />
          <RadioItem
            checked={this.props.state.type === 'genius'}
            onChange={() => this.props.handleChange('type', 'genius')}
          >牛人</RadioItem>
          <RadioItem
            checked={this.props.state.type === 'boss'}
            onChange={() => this.props.handleChange('type', 'boss')}
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
