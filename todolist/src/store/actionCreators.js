import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION, GET_INIT_LIST } from "./actionTypes"

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})

export const getAddItemAction = () => ({
  type: ADD_TODO_ITEM
})

export const getDeleteItemAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
})

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
})

// 使用了redux-thunk后 可以return一个函数出去(可以执行异步操作)
export const getTodoList = () => {
  return (dispatch) => {  //  直接接收dispatch方法
    setTimeout(()=>{
      const data = ["hello", "world", "asas"] //  假设返回的数据
      const action = initListAction(data)
      dispatch(action)
    }, 1000)
  }
}

// 使用redux-saga
export const getInitList = () => ({
  type: GET_INIT_LIST
})