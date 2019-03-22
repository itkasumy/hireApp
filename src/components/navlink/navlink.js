import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array
  }
  render() {
    const navList = this.props.data.filter(nav => !nav.hide)
    const {pathname} = this.props.location
    return <TabBar>
      {navList.map(nav => <TabBar.Item
        key={nav.path}
        title={nav.text}
        icon={{ uri: require(`./img/${nav.icon}.png`) }}
        selectedIcon={{uri: require(`./img/${nav.icon}-active.png`)}}
        selected={nav.path === pathname}
        onPress={() => this.props.history.push(nav.path)}
      ></TabBar.Item>)}
    </TabBar>
  }
}

export default NavLinkBar
