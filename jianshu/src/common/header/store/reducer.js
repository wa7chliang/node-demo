import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'

// immutable对象
const defaultState = fromJS({
  focused: false,
  mouseIn: false,
  list: [],
  page: 1,
  totalPage: 1
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.SEARCHFOCUS:
      return state.set('focused', true)
    case actionTypes.SEARCHBLUR:
      return state.set('focused', false)
    case actionTypes.CHANGELIST:
      return state.merge({
        list: action.data,
        totalPage: action.totalPage
      })
    case actionTypes.MOUSEENTER:
      return state.set('mouseIn', true)
    case actionTypes.MOUSELEAVE:
      return state.set('mouseIn', false)
    case actionTypes.CHANGEPAGE:
      return state.set('page', action.page)
    default:
      return state
  }
}