import {ONCLICKADDTODO, HANDLECHANGE, ONUPDATE, ONDELETE} from '../actions/todo';

/*
* 初始化state
 */

const initState = {
  list: [{id: 0, text: '123', completed: false}],
  inputText: '',
  id: 0
}

/*
* reducer
 */

export default function reducer(state = initState, action) {
  switch (action.type) {
    case ONCLICKADDTODO:
      return {
        list: [].concat(state.list, [{id: ++state.id, text: state.inputText, completed: false}]), 
        inputText: '', 
        id: state.id++
      }
    case HANDLECHANGE:
      return {
        ...state,
        inputText: action.e.target.value
      }
    case ONUPDATE:
      let newList = state.list
      newList.forEach((item, index) => {
        if(action.list.id === item.id) {
          newList.splice(index, 1)
          newList.push(action.list)
          return
        }
      })
      return {
        ...state, list: newList
      }
    case ONDELETE:
      let newList2 = state.list
      newList2.forEach((item, index) => {
        if(action.list.id === item.id) {
          newList2.splice(index, 1)
          return
        }
      })
      return {...state, list: newList2}
    default:
      return state
  }
}