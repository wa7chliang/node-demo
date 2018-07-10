import React, { Component } from 'react'
import Todolist from './todolist.js'
class Todo extends Component {
  constructor(props) {
    super(props)
    const list = [{id: 0, text: '123', completed: false}]
    this.state = {
      list: list,
      inputText: '',
      id: 0
    }
    this.onClickaddTodo = this.onClickaddTodo.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }
  onClickaddTodo() {
    let list = this.state.list
    let obj = {
      id: ++this.state.id,
      text: this.state.inputText,
      completed: false
    }
    list.push(obj)
    this.setState({list: list, inputText: '', id: this.state.id++})
  }
  handleChange(e) {
    this.setState({inputText: e.target.value})
  }
  onUpdate(list) {
    let newList = this.state.list
    newList.forEach((item, index) => {
      if(list.id === item.id) {
        // item.completed = true
        newList.splice(index, 1)
        newList.push(list)
        this.setState({list: newList})
        return
      }
    })
  }
  onDelete(list) {
    let newList = this.state.list
    newList.forEach((item, index) => {
      if(list.id === item.id) {
        newList.splice(index, 1)
        this.setState({list: newList})
        return
      }
    })
  }
  render() {
    return (
      <div>
        <input type='text' placeholder="要添加的内容" onChange={this.handleChange} value={this.state.inputText} />
        <button onClick={this.onClickaddTodo}>新增</button>
        <ul>
          {this.state.list.map(todo => 
            <Todolist key={todo.id} list={todo} onDelete={this.onDelete} onUpdate={this.onUpdate} />
          )}
        </ul>
      </div>
    )
  }
}

export default Todo