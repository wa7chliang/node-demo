import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem'
import './style.css'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }

  componentWillMount() {
    console.log('在组件即将被挂在到页面的时刻执行')
  }

  componentDidMount() {
    console.log('在组件被挂在到页面之后执行 这里一般放ajax数据请求的生命周期')
  }

  shouldComponentUpdate(nextProps, nextState) {
    // nextProps 更新后的props  nextState 更新后的state
    console.log('组件被更新之前会执行')
    return true //  需要返回一个bool类型值(false为不需要更改组件 true则更新)
  }

  componentWillUpdate() {
    console.log('组件被更新之前会执行 需要shouldComponentUpdate return true才执行')
  }

  componentDidUpdate() {
    console.log('组件更新完成之后会执行')
  }

  render(){
    console.log('render')
    return (
      <Fragment>
        <div>
          <label htmlFor='insertArea'>输入内容：</label>
          <input 
            id='insertArea'
            className='input'
            type="text" 
            value = {this.state.inputValue} 
            onChange = {this.handleInputChange} 
            ref={(input) => {this.input = input}}
          />
          <button
            onClick = {this.handleBtnClick}
          >提交</button>
        </div>
        <ul>
          {this.getTodoItem()}
        </ul>
      </Fragment>
    )
  }

  getTodoItem() {
    return this.state.list.map((item, index) => {
      return (<TodoItem 
                key={index}
                content={item} 
                index={index}
                handleItemDelete={this.handleItemDelete}
              />)
    })
  }

  handleInputChange() {
    const value = this.input.value  //  this.input指向ref
    this.setState(() => ({
      inputValue: value
    }))
  }
  handleBtnClick() {
    this.setState((prevState) => ({
      list: [...prevState.list, prevState.inputValue],
      inputValue: ''
    }))
  }
  handleItemDelete(index) {
    this.setState((prevState) => {
      let list = [...prevState.list]
      list.splice(index, 1)
      return {list}
    })
  }
}

export default TodoList