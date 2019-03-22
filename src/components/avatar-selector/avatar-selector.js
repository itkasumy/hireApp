import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(av => ({
        icon: require(`../img/${av}.png`),
        text: av
      }))

    const gridHeader = this.state.icon
      ? (<div>
        <span>已选头像</span>
        <img style={{width: 20}} src={this.state.icon} alt={this.state.text}/>
      </div>)
      : <div>选择头像</div>
    return (
      <div>
        <List renderHeader={gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={el => {
              this.setState({...el})
              this.props.selectAvatar(el.text)}}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector
