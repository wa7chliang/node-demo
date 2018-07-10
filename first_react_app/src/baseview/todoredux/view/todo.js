import React, { Component } from 'react'
import {onClickaddTodo, handleChange, onUpdate, onDelete} from '../actions/todo'
import {connect} from 'react-redux'
import Todolist from './todolist.js'

class Todo extends Component {
  render() {
    return (
      <div>
        <input type='text' placeholder="要添加的内容" onChange={e => this.props.handleChange(e)} value={this.props.todo.inputText} />
        <button onClick={() => this.props.onClickaddTodo()}>新增</button>
        <ul>
          {this.props.todo.list.map(todo => 
            <Todolist key={todo.id} list={todo} onUpdate={list => this.props.onUpdate(list)} onDelete={list => this.props.onDelete(list)} /> 
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todo: state.todo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickaddTodo: () => {
      dispatch(onClickaddTodo())
    },
    handleChange: e => {
      dispatch(handleChange(e))
    },
    onUpdate: list => {
      dispatch(onUpdate(list))
    },
    onDelete: list => {
      dispatch(onDelete(list))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
