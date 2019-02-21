import * as actionTypes from './actionTypes'
import axios from 'axios'
import { fromJS } from 'immutable'

export const searchFocus = () => ({
  type: actionTypes.SEARCHFOCUS
})

export const searchBlur = () => ({
  type: actionTypes.SEARCHBLUR
})

export const mouseEnter = () => ({
  type: actionTypes.MOUSEENTER
})

export const mouseLeave = () => ({
  type: actionTypes.MOUSELEAVE
})

export const changePage = (page) => ({
  type: actionTypes.CHANGEPAGE,
  page
})

const changeList = (data) => ({
  type: actionTypes.CHANGELIST,
  data: fromJS(data),
  totalPage: Math.ceil(data.length/10)
})

export const getList = () => {
  return (dispatch) => {
    axios.get('/api/headerList.json').then((res) => {
      const data = res.data
      dispatch(changeList(data.data))
    }).catch(() => {
      console.log('error')
    })
  }
}