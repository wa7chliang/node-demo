import { put, takeEvery } from 'redux-saga/effects'
import {GET_INIT_LIST} from './actionTypes'
import {initListAction} from './actionCreators'

function* getInitList() {
  var pro = new Promise((resolve) => {
    setTimeout(() => {
      const res = ["hello", "world", "asas"]
      resolve(res)
    }, 1000)
  })
  try {
    const res = yield pro
    const action = initListAction(res)
    yield put(action)
  } catch(e) {
    console.log('网络请求失败')
  }

}

function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getInitList); //  接收GET_INIT_LIST类型 执行getInitList方法
}

export default mySaga;