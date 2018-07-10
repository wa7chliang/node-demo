import todo from './reducers/todo'

export default function combineReducers(state = {}, action) {
  return {
      todo: todo(state.todo, action)
  }
}

