import React, { Component } from 'react'
// import PropTypes from 'prop-types'

class Todolist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.list
    }
    this.onClickReady = this.onClickReady.bind(this)
    this.onClickDelete = this.onClickDelete.bind(this)
  }

  onClickReady() {
    const list = this.state.list
    if (list.completed === true) {
      return
    }
    list.completed = true
    this.props.onUpdate(list)
  }

  onClickDelete() {
    const list = this.state.list
    this.props.onDelete(list)
  }

  render() {
    const mr20 = {
      margin: '0 20px'
    }
    return (
      <li>
        {this.state.list.text}
        <span style={mr20}>{this.state.list.completed? '已完成': '未完成'}</span>
        <button onClick={this.onClickReady}>完成</button>    
        <button onClick={this.onClickDelete}>删除</button>            
      </li>
    )
  }
}

Todolist.defaultProps = {
  list: [],
  onUpdate: f => f, //默认一个什么都不做的函数
  onDelete: f => f
}


export default Todolist