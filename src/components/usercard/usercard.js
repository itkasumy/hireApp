import React from 'react'
import PropTypes from 'prop-types'
import { WingBlank, WhiteSpace, Card} from 'antd-mobile'

export default class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }

  render() {
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
                <Card.Body>
                  {v.type === 'boss' ? <div>公司名称: {v.company}</div> : null}
                  {(v.type === 'boss' ? <h4>职位要求:</h4> : <h4>个人简介:</h4>)} { v.desc.split('\n').map(d => <div key={d}>{d}</div>)}
                   <WhiteSpace></WhiteSpace>
                  {v.type === 'boss' ? <div>薪资: {v.money}</div> : null}
                </Card.Body>
              </Card>
              <WhiteSpace></WhiteSpace>
            </div>
          ) : null)
        }
      </WingBlank>
    )
  }
}
