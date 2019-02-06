import React from 'react';
import ReactDOM from 'react-dom';
// import TodoList from './TodoList';
// import RTodoList from './RTodoList';
import RRTodoList from './reactReduxIndex';
import { Provider } from "react-redux";
import store from './store'
// import App from './App'
// https协议 可以缓存网站
// import * as serviceWorker from './serviceWorker';

//  正常使用：
// ReactDOM.render(<RTodoList />, document.getElementById('root'));

const App = (
  <Provider store={store}>
    <RRTodoList />
  </Provider>
)

// 使用react-redux
ReactDOM.render(App, document.getElementById('root'));

// serviceWorker.unregister();
