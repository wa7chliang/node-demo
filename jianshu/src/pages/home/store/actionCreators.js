import * as actionTypes from './actionTypes'
import axios from 'axios'
import { fromJS } from 'immutable'

const changeHomeData = (result) => ({
  type: actionTypes.CHANGE_HOME_DATA,
  topicList: result.topicList,
  articleList: result.articleList,
  recommendList: result.recommendList
})

export const getHomeInfo = () => {
  return (dispatch) => {
    axios.get('/api/home.json').then((res) => {
      const result = res.data.data
      dispatch(changeHomeData(result))      
    })
  }
}

const addHomeList = (list) => ({
  type: actionTypes.ADD_HOME_LIST,
  list: fromJS(list)
})

export const getMoreList = () => {
  return (dispatch) => {
    axios.get('/api/home.json').then((res) => {
      const result = res.data.data.articleList
      dispatch(addHomeList(result))
    })
  }
}

export const toggleTopShow = (show) => ({
  type: actionTypes.TOGGLE_SCROLL_TOP,
  show
})