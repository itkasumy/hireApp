import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user-redux'
import { connect } from 'react-redux'

@withRouter
  @connect(
  null,
  {loadData}
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return
    }
    axios.get('/user/info')
      .then(res => {
        if (res.status === 200) {
          // console.log(res.data)
          if (res.data.code === 0) {
            // 登录成功
            this.props.loadData(res.data.data)
          } else {
            // 登录失败
            this.props.history.push('/login')
          }
        }
      })
  }
  
  render() {
    return (<div></div>)
  }
}

export default AuthRoute