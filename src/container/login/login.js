import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import {login} from '../../redux/user-redux'

import Logo from '../../components/logo/logo'

// @WrapperHello
// class Hello extends React.Component {
//   render() {
//     return <p>Hello React</p>
//   }
// }

// // function WrapperHello(Comp) {
// //   class WrapperComp extends React.Component {
// //     render() {
// //       return (
// //         <div>
// //           <h2>这是HOC高阶组件特有的元素の属性代理</h2>
// //           <Comp name="ksm" {...this.props}></Comp>
// //         </div>
// //       )
// //     }
// //   }
// //   return WrapperComp
// // }

// function WrapperHello(Comp) {
//   class WrapperComp extends Comp {
//     componentDidMount() {
//       console.log('这是HOC高阶组件特有的元素の修改生命周期-反向继承')
//     }
    
//     render() { 
//       return (
//         <div>
//           <h2>这是HOC高阶组件特有的元素の修改生命周期-反向继承</h2>
//           <Comp></Comp>
//         </div>
//       )
//     }
//   }
//   return WrapperComp
// }

// // Hello = WrapperHello(Hello)

@connect(
  state => state.user,
  {login}
)
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: ''
    }
    this.register = this.register.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  register() {
    this.props.history.push('/register')
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  
  handleClick() {
    this.props.login(this.state)
  }
  
  render() {
    return (<div>
      {/* <Hello></Hello> */}
      <Hello></Hello>
      {this.props.redirectTo && (this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo} /> : null}
      <Logo></Logo>
      <WingBlank>
        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
        <List>
          <InputItem
            onChange={v => this.handleChange('user', v)}
          >用户:</InputItem>
          <WhiteSpace />
          <InputItem
            type="password"
            onChange={v => this.handleChange('pwd', v)}
          >密码:</InputItem>
        </List>
        <WhiteSpace />
        <Button
          type="primary"
          onClick={this.handleClick}
        >登录</Button>
        <WhiteSpace />
        <Button onClick={this.register} type="primary">注册</Button>
      </WingBlank>
    </div>)
  }
}

export default Login
