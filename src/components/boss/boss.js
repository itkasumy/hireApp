import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser';

@connect(
  state => state.chatuser,
  {getUserList}
)
class Boss extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  
  componentDidMount() {
  //   axios.get('/user/list?type=boss')
  //     .then(res => {
  //       if (res.status === 200 && res.data.code === 0) {
  //         this.setState({
  //           data: res.data.data
  //         })
  //       }
  //     })
    this.props.getUserList('genius')
    console.log(this.props)
  }

  render() {
    console.log(this.state)
    return (
      <WingBlank>
        {
          this.props.userlist.map(v => v.avatar ? (
            <div key={v._id}>
              <Card>
                <Card.Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                  ></Card.Header>
                <Card.Body>{v.desc.split('\n').map(v => <div key={v}>{v}</div>)}</Card.Body>
              </Card>
              <WhiteSpace></WhiteSpace>
            </div>
          ) : null)
        }
      </WingBlank>
    )
  }
  
}

export default Boss
