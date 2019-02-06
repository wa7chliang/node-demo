import React, { Component } from 'react';
import store from './store'
import {getInputChangeAction, getAddItemAction, getDeleteItemAction, getInitList} from './store/actionCreators'
import TodoListUI from './TodoListUI'

class RTodoList extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
    store.subscribe(this.handleStoreChange) //  store数据发生改变时执行的方法
  }

  render() {
    return <TodoListUI 
              inputValue={this.state.inputValue}
              handleInputChange={this.handleInputChange}
              handleBtnClick={this.handleBtnClick}
              list={this.state.list}
              handleItemDelete={this.handleItemDelete}
              />
  }

  componentDidMount() {
    // 用于请求ajax数据
    // const action = getTodoList() //  使用redux-thunk
    const action = getInitList()  //  使用redux-saga
    store.dispatch(action)
  }

  handleInputChange(e) {
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action)
  }
  handleStoreChange() {
    this.setState(store.getState()) //  数据修改后更新页面数据
  }
  handleBtnClick() {
    const action = getAddItemAction()
    store.dispatch(action)
  }
  handleItemDelete(index) {
    const action = getDeleteItemAction(index)
    store.dispatch(action)
  }
}

export default RTodoList