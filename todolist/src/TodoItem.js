import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps() {
    console.log('从父组件接受了参数并且父组件的render函数被重新执行 才会执行')
  }

  componentWillUnmount() {
    console.log('当组件即将被页面剔除的时候会被执行')
  }

  render() {
    const { content } = this.props
    return (
      <div onClick={this.handleClick}>
        {content}
      </div>
    )
  }

  handleClick() {
    const { handleItemDelete, index } = this.props
    handleItemDelete(index)
  }
}

TodoItem.propTypes = {
  content: PropTypes.string,
  handleItemDelete: PropTypes.func,
  index: PropTypes.number
}

TodoItem.defaultProps = {
  content: 'hello world'
}

export default TodoItem