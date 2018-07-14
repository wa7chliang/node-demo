import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {reducer as weatherReducer} from './weather/'

const reducer = combineReducers({
  weather: weatherReducer
})

// 使用redux-thunk
const middlewares = [thunkMiddleware]

export default createStore(reducer, {}, applyMiddleware(...middlewares))