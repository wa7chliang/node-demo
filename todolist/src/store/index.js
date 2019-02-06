import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import todoListSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

// const store = createStore(reducer, applyMiddleware(thunk)) //  使用redux-thunk
const store = createStore(reducer, applyMiddleware(sagaMiddleware)) //  使用redux-saga
sagaMiddleware.run(todoListSaga)

export default store