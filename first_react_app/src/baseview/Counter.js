import React, { Component } from 'react'
// 15.5版本以后propTypes引入方法
import PropTypes from 'prop-types'

const buttonStyle = {
  margin: '10px'
}

class Counter extends Component {
  constructor(props) {
    // props为父组件传递的数据
    super(props)
    this.state = {
      count: props.initValue
    }
    // 绑定函数：
    this.onClickIncrementButton = this.onClickIncrementButton.bind(this)
    this.onClickDecrementButton = this.onClickDecrementButton.bind(this)
  }

  onClickIncrementButton() {
    this.updateCount(true)
  }

  onClickDecrementButton() {
    this.updateCount(false)
  }

  updateCount(isIncrement) {
    const perviousValue = this.state.count
    const newValue = isIncrement ? perviousValue + 1 : perviousValue - 1
    this.setState({count: newValue})  //改变state属性使用setState
    this.props.onUpdate(newValue, perviousValue) //使用父传子的onUpdate={函数}
  }

  render() {
    const {caption} = this.props
    return (
      <div>
        <button style={buttonStyle} onClick={this.onClickIncrementButton}>+</button>
        <button style={buttonStyle} onClick={this.onClickDecrementButton}>-</button>
        <span>{caption}count: {this.state.count}</span>  
      </div>
    )
  }
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired, //检测类型字符串,必填
  initValue: PropTypes.number,
  onUpdate: PropTypes.func
}

Counter.defaultProps = {
  initValue: 0,
  onUpdate: f => f //默认一个什么都不做的函数
}

export default Counter