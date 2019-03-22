import React from 'react'
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Route, Switch } from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../../components/user/user'

@connect(
  state => state,
  {}
)
class Dashboard extends React.Component {
  render() {
    const user = this.props.user
    const { pathname } = this.props.location
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'BOSS',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return <div>
      <NavBar
        className="fixed-header"
        mode="dark"
      >{navList.find(v => v.path === pathname).title}</NavBar>
      <NavLinkBar data={navList}></NavLinkBar>
      <div style={{marginTop: 45}}>
        <Switch>
          {navList.map(nav => (<Route key={nav.path} path={nav.path} component={nav.component} />))}
        </Switch>
      </div>
    </div>
  }
}

function Msg() {
  return <div>Msg</div>
}

export default Dashboard
